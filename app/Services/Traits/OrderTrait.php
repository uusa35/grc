<?php

namespace App\Services\Traits;

use App\Jobs\sendSuccessOrderEmail;
use App\Models\Country;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Questionnaire;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Timing;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use function PHPUnit\Framework\isNull;

trait OrderTrait
{

    public function createQuestionnaireOrder(Questionnaire $questionnaire, User $user)
    {
        $order = Order::create([
            'price' => (float) $questionnaire->net_price,
            'net_price' => (float) $questionnaire->net_price,
            'mobile' => $questionnaire->mobile,
            'country' => $user->country->slug,
            'email' => $questionnaire->email,
            'address' => $user->address,
            'user_id' => $questionnaire->client_id, // the one who asked for the design
        ]);
        $orderMeta = $order->order_metas()->create([
            'qty' => 1,
            'price' => (float) $questionnaire->net_price,
            'notes' => $questionnaire->notes,
            'item_name' => strtoupper(class_basename($questionnaire)),
            'item_type' => strtoupper(class_basename($questionnaire)),
            'merchant_id' => $questionnaire->user_id,
            'questionnaire_id' => $questionnaire->id
        ]);
        return $order;
    }

    public function createWebOrder(Request $request, User $user)
    {
        $validate = validator($request->all(), [
            'country_id' => 'required|exists:countries,id',
            'collection_id' => 'exists:collections,id',
            'payment_method' => 'required|min:3',
            'branch_id' => 'required_if:receive_on_branch,1|exists:branches,id'
//            'shipment_fees' => 'required|numeric'
        ]);
        if ($validate->fails()) {
            return redirect()->route('frontend.cart.index')->withErrors($validate);
        }
        $coupon = session()->has('coupon') ? session('coupon') : false;
        $country = Country::whereId($request->country_id)->first();
        $order = Order::create([
            'price' => (float) $this->getTotalPriceOfProductsOnly($this->cart),
            'net_price' => (float) getCartNetTotal(),
            'mobile' => $request->mobile,
            'country' => $country->name,
            'area' => $request->area ? $request->area : null,
            'email' => $request->email,
            'address' => $request->address,
            'notes' => $request->notes,
            'user_id' => $user->id,
            'cash_on_delivery' => $request->has('cash_on_delivery') ? $request->cash_on_delivery : false,
            'discount' => (float) $coupon ? ($coupon->is_percentage ? ($this->cart->subTotal() * ($coupon->value / 100)) : $coupon->value) : 0,
            'coupon_id' => $coupon ? $coupon['id'] : null,
            'payment_method' => $request->payment_method,
            'shipment_fees' => (float) $this->cart->content()->where('options.type', 'country')->first()->total(),
            'receive_on_branch' => $request->has('receive_on_branch') ? $request->receive_on_branch : 0
        ]);
        $request->has('branch_id') && !is_null($request->branch_id) ? $order->update(['branch_id' => $request->branch_id]) : null;
        if ($order) {
            $this->cart->content()->each(function ($element) use ($order, $user) {
                if ($element->options->type === 'product' || $element->options->type === 'service') {
                    $order->order_metas()->create([
                        'order_id' => $order->id,
                        'product_id' => $element->options->type === 'product' ? $element->options->element_id : null,
                        'service_id' => $element->options->type === 'service' ? $element->options->element_id : null,
                        'product_attribute_id' => $element->options->product_attribute_id,
                        'collection_id' => $element->options->collection_id ? $element->options->collection_id : null,
                        'item_name' => $element->options->element->name,
                        'item_type' => $element->options->type,
                        'qty' => $element->qty,
                        'price' => (float) $element->price,
                        'notes' => $element->options->notes ? $element->options->notes : null,
                        'product_size' => $element->options->size ? $element->options->size->name : null,
                        'product_color' => $element->options->color ? $element->options->color->name : null,
                        'service_date' => $element->options->day_selected,
                        'service_time' => $element->options->timing ? $element->options->timing->start : null,
                        'timing_id' => $element->options->timing_id,
                        'destination_id' => $user->country_id,
                    ]);
                }
            });
            return $order;
        }
        return false;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function createUser(Request $request)
    {
        $validate = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required|numeric|min:8',
            'address' => 'required|min:2',
            'country_id' => 'required|exists:countries,id',
        ]);
        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate);
        }
        if (auth()->check()) {
            $user = auth()->user();
            $user->update([
                'name' => $request->name,
                'password' => bcrypt($request->mobile),
                'country_id' => $request->country_id,
                'mobile' => $request->mobile,
                'address' => $request->address,
                'role_id' => $user->role_id ? $user->role_id : Role::where('is_client', true)->first()->id
            ]);
        } else {
            $user = User::where('email', $request->email)->orWhere(['mobile' => $request->mobile])->first();
            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'password' => bcrypt($request->mobile),
                    'country_id' => $request->country_id,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                ]);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->mobile),
                    'country_id' => $request->country_id,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'role_id' => Role::where('is_client', true)->first()->id
                ]);
            }

        }
        return $user;
    }

    public function checkCart(Request $request)
    {
        try {
            $validate = validator($request->all(), [
                'order_id' => 'numeric|exists:orders,id',
                'name' => 'required|min:3|max:200',
                'email' => 'required|email',
                'mobile' => 'required:min:6',
                'address' => 'required|min:5',
                'country_id' => 'required|exists:countries,id',
                'collection_id' => 'numeric|exists:collections,id',
                'cart' => 'required|array',
                'coupon_id' => 'nullable|exists:coupons,id',
                'price' => 'required',
                'net_price' => 'required',
                'shipment_fees' => 'required',
                'discount' => 'required',
                'payment_method' => 'required|min:3',
                'shipment_fees' => 'required|numeric',
                'cash_on_delivery' => 'required|boolean',
            ]);
            if ($validate->fails()) {
                return $validate->errors()->first();
            }
            if ($request->has('order_id')) {
                $className = env('ORDER_MODEL_PATH');
                $order = new $className();
                $order = $order->whereId($request->order_id)->with('order_metas.product', 'order_metas.product_attribute')->first();
                if ($order) {
                    return $order;
                }
            }
            $user = User::where(['email' => $request->email])->orWhere(['mobile' => $request->mobile])->first();
            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'area' => $request->area,
                    'block' => $request->block,
                    'street' => $request->street,
                    'building' => $request->building,
                    'apartment' => $request->apartment,
                    'country_id' => $request->country_id,
                ]);
            } else {
                $user = User::create([
                    'email' => $request->email,
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'area' => $request->area,
                    'block' => $request->block,
                    'street' => $request->street,
                    'building' => $request->building,
                    'apartment' => $request->apartment,
                    'country_id' => $request->country_id,
                    'password' => bcrypt($request->mobile),
                    'role_id' => Role::where('is_client', true)->first()->id
                ]);

            }
            return $order = $this->createApiOrder($request, $user);
            return new \Exception('User is not created successfully');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function createApiOrder(Request $request, $user)
    {
        try {
            if (!$user->country->is_local) {
                foreach ($request->cart as $item) {
                    if ($item['type'] === 'service') {
                        return trans('message.services_are_only_allowed_locally_your_order_is_not_complete');
                    }
                }
            }
            $order = Order::create([
                'price' => (float) $request->price,
                'net_price' => (float) $request->net_price,
                'mobile' => $request->mobile,
                'country' => $user->country->slug,
                'area' => $request->has('area') ? $request->area : 'N/A',
                'block' => $request->block,
                'street' => $request->street,
                'building' => $request->building,
                'apartment' => $request->apartment,
                'email' => $request->email,
                'address' => $request->address,
                'notes' => $request->notes,
                'user_id' => $user->id,
                'discount' => $request->discount,
                'shipment_fees' => (float) $request->shipment_fees,
                'coupon_id' => $request->has('coupon_id') ? $request->coupon_id : null,
                'payment_method' => $request->payment_method,
                'cash_on_delivery' => $request->cash_on_delivery,
            ]);
            if ($order) {
                $settings = Setting::first();
                foreach ($request->cart as $item) {
                    if ($item['type'] === 'product') {
                        $product = Product::whereId($item['product_id'])->first();
                        $productAttribute = $product->hasRealAttributes ? ProductAttribute::whereId($item['product_attribute_id'])->with('size', 'color')->first() : null;
                        $order->order_metas()->create([
                            'order_id' => $order->id,
                            'product_id' => $item['product_id'],
                            'product_attribute_id' => $product->hasRealAttributes ? $item['product_attribute_id'] : null,
                            'collection_id' => $request->collection_id,
                            'qty' => $item['qty'],
                            'price' => $item['wrapGift'] ? (float)$item['element']['finalPrice'] + (float)$settings->gift_fee : (float)$item['element']['finalPrice'],
                            'item_name' => $item['element']['name'],
                            'item_type' => class_basename($product),
                            'notes' => $item['notes'] ? $item['notes'] : null,
                            'product_size' => $productAttribute ? $productAttribute->size->name : ($product->size ? $product->size->name : null),
                            'product_color' => $productAttribute ? $productAttribute->color->name : ($product->color ? $product->color->name : null),
                            'wrap_as_gift' => $item['wrapGift']
                        ]);
                    } else if ($item['type'] === 'service') {
                        // later we should check of multi Booking !!!
                        $timing = Timing::whereId($item['timing_id'])->first();
                        $order->order_metas()->create([
                            'order_id' => $order->id,
                            'service_id' => $item['service_id'],
                            'qty' => $item['qty'],
                            'price' => (float) $item['element']['finalPrice'],
                            'item_name' => $item['element']['name'],
                            'item_type' => $item['type'],
                            'notes' => $item['notes'] ? $item['notes'] : null,
                            'timing_id' => $item['timing_id'],
                            'service_date' => Carbon::now()->format('l') === $timing->day ? Carbon::parse($timing->day)->addWeek() : Carbon::parse($timing->day),
                            'service_time' => $timing->start
                        ]);
                    }
                }
                if ($order->cash_on_delivery) {
                    $contactus = Setting::first();
                    dispatch(new sendSuccessOrderEmail($order, $order->user, $contactus))->delay(now()->addSeconds(10));
                }
                return $order;
            }
            return trans('message.order_is_not_created');
        } catch (\Exception $e) {
            return $e->getLine() . ' - ' . $e->getMessage() . ' - ' . $e->getFile();
        }
    }

    public function decreaseQty(Order $order)
    {
        try {
            if ($order->paid) {
                $order->order_metas->each(function ($orderMeta) use ($order) {
                    if ($orderMeta->isProductType) {
                        if ($orderMeta->product->check_stock) {
                            if ($orderMeta->product->hasRealAttributes) {
                                $decrement = (int)$orderMeta->product_attribute->qty - (int)$orderMeta->qty > 0 ? (int)$orderMeta->product_attribute->qty - (int)$orderMeta->qty : 0;
                                $orderMeta->product_attribute->update(['qty' => $decrement]);
                            } else {
                                $decrement = (int)$orderMeta->product->qty - (int)$orderMeta->qty > 0 ? (int)$orderMeta->product->qty - (int)$orderMeta->qty : 0;
                                $orderMeta->product->update(['qty' => $decrement]);
                            }
                        }
                    } else {
                        // in case you want to do something for services
                    }
                });
            }
        } catch (\Exception $e) {
            print_r($e->getMessage() . 'Qty not updated. Fatel error');
        }
    }

    public function createOrderForMirsal(Order $order, User $user)
    {
        try {
//            $sender = $order->order_metas->first()->product->user;
            $metas = $order->order_metas()->with('product.user')->get();
            if (env('MIRSAL_ENABLED') && !$order->shipment_reference && $order->paid && $order->user->country->is_local) {
                $pickupPoints = [];
                foreach ($metas as $meta) {
                    array_push($pickupPoints, [
                        'name' => $meta->product->user->name,
                        'phone' => $meta->product->user->fullMobile,
                        'governorate_id' => $meta->product->user->area,
                        'area_id' => $meta->product->user->localArea ? $meta->product->user->localArea->code : null,
                        'block' => $meta->product->user->block,
                        'street' => $meta->product->user->street,
                        'apartment' => $meta->product->user->appartment,
                        'unit' => 'Floor :' . $meta->product->user->floor,
                        'location' => $meta->product->user->address,
                        'note' => 'Product Name : ' . $meta->product->name . ' - Product SKU : ' . $meta->product->sku,
                    ]);
                }
                $url = env('MIRSAL_API_URL');
                $access_key = env('MIRSAL_ACCESS_KEY');
                $access_secret = env('MIRSAL_SECRET_KEY');
                $prog_lang = 'other';
                $data = [
                    'content' => 'Order Id : ' . $order->id,
                    'cost' => (float) $order->net_price,
                    'payment_method' => $order->payment_method,
                    'default_sender ' => env('APP_NAME'),
//                    'sender_name' => $sender->name,
//                    'sender_phone' => $sender->mobile,
//                    'sender_governorate' => 'A241',
//                    'sender_area' => 'FH242',
//                    'sender_block' => '00',
//                    'sender_street' => '00000',
//                    'sender_apartment' => $sender->apartment,
//                    'sender_avenue' => $sender->address,
//                    'sender_unit' => '0000',
//                    'sender_floor' => $sender->floor,
//                    'sender_note' => 'Sender Address :' . $sender->address . ' - ' . $sender->description,
//                    'sender_location' => '',
                    'receiver_name' => $user->name,
                    'receiver_phone' => $order->mobile,
                    'receiver_governorate' => 'A242',
                    'receiver_area' => 'JL244',
                    'receiver_block' => '0000',
                    'receiver_street' => '0000',
                    'receiver_apartment' => $order->address,
                    'receiver_avenue' => '',
                    'receiver_unit' => '',
                    'receiver_floor' => $order->address,
                    'receiver_note' => 'Receiver Address : ' . $order->address . ' - Notes :' . $order->notes,
                    'receiver_location' => $order->user->country->slug,
                    'pickup_date' => Carbon::now()->addHours(5)->format('d/m/Y'),
                    'pickup_time' => Carbon::tomorrow()->addHours(10)->format('h:s a'),
                    'image' => '',
                    'pickup_points' => [
                        $pickupPoints
                    ],
                ];
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, ['request_data' => json_encode($data), 'access_key' => $access_key, 'prog_lang' => $prog_lang]);
                $response = curl_exec($ch);
                $res = collect(json_decode($response));
                if ($res['status'] === "201") {
                    $order->update(['shipment_reference' => 'Mirsal - ' . $res['data']->transaction_id]);
                }
                curl_close($ch);
            }
        } catch (\Exception $e) {
            print_r($e->getMessage() . '- Mirsal Error');
        }
    }
}
