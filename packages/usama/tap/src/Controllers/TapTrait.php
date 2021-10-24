<?php

namespace Usama\Tap\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Setting;
use App\Models\User;
use App\Services\Traits\OrderTrait;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;
use mysql_xdevapi\Exception;

trait TapTrait
{
    use OrderTrait;

    public function processPayment()
    {
        try {
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.tap.company/v2/invoices",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => "{\"draft\":false,\"due\":99999999999,\"expiry\":1604728943000,\"description\":\"test invoice\",\"mode\":\"INVOICE\",\"note\":\"test note\",\"notifications\":{\"channels\":[\"SMS\",\"EMAIL\"],\"dispatch\":true},\"currencies\":[\"KWD\"],\"metadata\":{\"udf1\":\"1\",\"udf2\":\"2\",\"udf3\":\"3\"},\"charge\":{\"receipt\":{\"email\":true,\"sms\":true},\"statement_descriptor\":\"test\"},\"customer\":{\"email\":\"test@test.com\",\"first_name\":\"test\",\"last_name\":\"test\",\"middle_name\":\"test\",\"phone\":{\"country_code\":\"965\",\"number\":\"51234567\"}},\"order\":{\"amount\":12,\"currency\":\"KWD\",\"items\":[{\"amount\":10,\"currency\":\"KWD\",\"description\":\"test\",\"discount\":{\"type\":\"P\",\"value\":0},\"image\":\"\",\"name\":\"test\",\"quantity\":1}],\"shipping\":{\"amount\":1,\"currency\":\"KWD\",\"description\":\"test\",\"provider\":\"ARAMEX\",\"service\":\"test\"},\"tax\":[{\"description\":\"test\",\"name\":\"VAT\",\"rate\":{\"type\":\"F\",\"value\":1}}]},\"payment_methods\":[\"\"],\"post\":{\"url\":\"http://your_website.com/post_url\"},\"redirect\":{\"url\":\"http://your_website.com/redirect_url\"},\"reference\":{\"invoice\":\"INV_00001\",\"order\":\"ORD_00001\"}}",
                CURLOPT_HTTPHEADER => array(
                    "authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ",
                    "content-type: application/json"
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);

            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                echo $response;
            }
        } catch (Exception $e) {
            abort(404, $e->getMessage());
        }
    }

    public function getProducts($order)
    {
        $productsList = [];
        foreach ($order->order_metas as $orderMeta) {
            if ($orderMeta->isProductType) {
                array_push($productsList, [
                    'CurrencyCode' => env('TAP_CURRENCY_CODE'),
                    'ImgUrl' => $orderMeta->product->imageLargeLink,
                    'Quantity' => $orderMeta->qty,
                    'TotalPrice' => $orderMeta->price * $orderMeta->qty,
                    'UnitID' => $orderMeta->product->id,
                    'UnitName' => $orderMeta->product->name,
                    'UnitPrice' => $orderMeta->price,
                    'UnitDesc' => $orderMeta->product->description,
                    'VndID' => $orderMeta->product->user->merchant_id,
                ]);
            } elseif ($orderMeta->isServiceType) {
                array_push($productsList, [
                    'CurrencyCode' => env('TAP_CURRENCY_CODE'),
                    'ImgUrl' => $orderMeta->service->imageLargeLink,
                    'Quantity' => $orderMeta->qty,
                    'TotalPrice' => $orderMeta->price * $orderMeta->qty,
                    'UnitID' => $orderMeta->service->id,
                    'UnitName' => $orderMeta->service->name,
                    'UnitPrice' => $orderMeta->price,
                    'UnitDesc' => $orderMeta->service->description,
                    'VndID' => $orderMeta->service->user->merchant_id,
                ]);
            } elseif ($orderMeta->isQuestionnaireType) {
                array_push($productsList, [
                    'CurrencyCode' => env('TAP_CURRENCY_CODE'),
                    'ImgUrl' => $order->user->imageThumbLink,
                    'Quantity' => 1,
                    'TotalPrice' => $orderMeta->price * $orderMeta->qty,
                    'UnitID' => $orderMeta->questionnaire->id,
                    'UnitName' => $orderMeta->questionnaire->name,
                    'UnitPrice' => $orderMeta->price,
                    'UnitDesc' => $orderMeta->notes,
                    'VndID' => $orderMeta->merchant_id,
                ]);
            }
        }
        if ($order->shipment_fees) {
            array_push($productsList, [
                'CurrencyCode' => env('TAP_CURRENCY_CODE'),
                'ImgUrl' => asset('images/shipment.png'),
                'Quantity' => 1,
                'TotalPrice' => (float)round($order->shipment_fees, 2),
                'UnitID' => $order->id,
                'UnitName' => 'Shipping Cost',
                'UnitPrice' => (float)$order->shipment_fees,
                'UnitDesc' => 'Shipping Cost',
                'VndID' => $order->user_id,
            ]);
        }
        if ($order->discount > 0) {
            array_push($productsList, [
                'CurrencyCode' => env('TAP_CURRENCY_CODE'),
                'ImgUrl' => asset(env('LARGE')) . Setting::first()->logo,
                'Quantity' => 1,
                'TotalPrice' => -($order->discount),
                'UnitID' => $order->id,
                'UnitName' => 'Coupon',
                'UnitPrice' => '-' . $order->discount,
                'UnitDesc' => 'Coupon (Discount)',
                'VndID' => '',
            ]);
        }
        return $productsList;
    }


    public function getGateWay()
    {
        return ["Name" => config('tap.gatewayDefault')];
    }

    public function getMerchant($totalPrice)
    {
        return [
            "AutoReturn" => config('tap.autoReturn'),
            "ErrorURL" => config('tap.errorUrl'),
            "HashString" => $this->getHashString($totalPrice),
            "LangCode" => config('tap.langCode'),
            "MerchantID" => config('tap.merchantId'),
            "Password" => config('tap.password'),
            "PostURL" => config('tap.postUrl'),
            "ReferenceID" => '',
            "ReturnURL" => config('tap.returnUrl'),
            "UserName" => config('tap.userName')
        ];
    }

    public function setHashString($totalPrice)
    {
        return $toBeHashedString = 'X_MerchantID' . config('tap.merchantId') .
            'X_UserName' . config('tap.userName') .
            'X_ReferenceID' . '45870225000' .
            'X_Mobile' . '1234567' .
            'X_CurrencyCode' . config('tap.currencyCode') .
            'X_Total' . $totalPrice;
    }

    public function getHashString($totalPrice)
    {
        return hash_hmac('sha256', $this->setHashString($totalPrice), config('tap.apiKey'));
    }

    public function clearCart()
    {
        session()->forget('cart');
    }
}
