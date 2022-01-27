<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthExtraLightResource;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\UserLightResource;
use App\Http\Resources\UserResource;
use App\Mail\OrderPaid;
use App\Models\Country;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use App\Services\Traits\OrderTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;

class FrontendCartController extends Controller
{
    use OrderTrait;

    public function index()
    {
        return inertia('Frontend/Cart/CartIndex');
    }

    public function getUserInformation()
    {
        $countries = new CountryCollection(Country::active()->has('areas', '>', 0)->with('areas')->get());
        $auth = auth()->id() ? new UserResource(User::whereId(request()->user()->id)->with(['role', 'country'])->first()) : null;
        return inertia('Frontend/Cart/CartUserInformation', compact('countries', 'auth'));
    }

    public function getUserConfirmation()
    {
        $countries = new CountryCollection(Country::active()->has('areas', '>', 0)->with('areas')->get());
        $auth = auth()->id() ? new UserResource(User::whereId(request()->user()->id)->with(['role', 'country'])->first()) : null;
        return inertia('Frontend/Cart/CartUserConfirmation', compact('auth', 'countries'));
    }

    public function getPaymentIndex(Request $request)
    {
        return redirect()->route('frontend.cart.confirmation');
    }

    public function getPayment(Request $request)
    {
        $order = $this->createOrder($request);
        return inertia('Frontend/Cart/CartPaymentIndex', compact('order'));
    }

    public function makeCodPayment(Request $request)
    {
        $validator = validator($request->all(), ['order_id' => 'required|integer|exists:orders,id']);
        if ($validator->fails()) {
            return redirect()->back()->withErrors(['message' => $validator->errors()->first()], 400);
        }
        $order = Order::whereId($request->order_id)->with('user')->first();
        $settings = Setting::first();
        Mail::to($settings->email)->cc($order->user->email)->send(new OrderPaid($order));
        $markdown = new Markdown(view(), config('mail.markdown'));
        return $markdown->render('emails.orders.paid', ['order' => $order]);
    }

    public function getCouponCode()
    {
        return inertia('Frontend/Cart/CartIndex');
    }

    public function postCouponCode(Request $request)
    {
        $request->validate([
            'code' => 'required|min:4'
        ]);
        $coupon = Coupon::where(['active' => true, 'consumed' => false, 'code' => $request->code])->whereDate('due_date', '>', Carbon::now())->first();
        if ($coupon) {
            return inertia('Frontend/Cart/CartIndex', compact('coupon'))->with('success', trans('general.process_success'));
        }
        return inertia('Frontend/Cart/CartIndex')->with('error', trans('general.process_failure'));
    }
}
