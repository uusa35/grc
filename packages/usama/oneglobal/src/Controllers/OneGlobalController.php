<?php

namespace Usama\OneGlobal\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Mail\OrderPaid;
use App\Models\Order;
use App\Models\Setting;
use App\Services\Traits\OrderTrait;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class OneGlobalController extends Controller
{
    use OrderTrait;

    public function makePayment(Request $request)
    {
        try {
            // 1- prepare data
            // 2- update order with the reference_id
            // 3- return the paymentURL
            $validator = validator($request->all(), [
                'netTotal' => 'required|numeric',
                'order_id' => 'required|exists:orders,id',
                'paymentMethod' => 'required|string'
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors()->first());
            }
            // Step 2.1 : Between Step 2 and Step 3
            $postArray = ["ValidatePaymentRequest" => [
                "merchantCode" => "xxxxx",
                "authKey" => "xxxxxxxxx",
                "currency" => "KWD",
                "pc" => "KWKFHMPGSCCKWD",
                "tunnel" => "",
                "amount" => 1,
                "doConvert" => "N",
                "sourceCurrency" => "conditional",
                "description" => "optional",
                "referenceID" => "(15 digit random number)",
                "timeStamp" => "yyyy/MM/dd HH:mm:ss tt",
                "language" => "en",
                "callbackURL" => "Your website URL",
                "hash" => "ComputedHash",
                "userReference" => 0,
                "billingDetails" =>
                    [
                        "fName" => "First Name",
                        "lName" => "last Name",
                        "mobile" => "mobile",
                        "email" => "email",
                        "city" => "city",
                        "pincode" => "pincode",
                        "state" => "state",
                        "address1" => "address1",
                        "address2" => "address2"
                    ]
            ]];

//            $this->updateOrderRerferenceId($request->order_id, $payment->id, $request->paymentMethod);
//            return response()->json($approvalUrl, 200);

            // Redirect the customer to $approvalUrl

        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            dd('code : ' . $ex->getCode() . 'data :' . $ex->getData());
        } catch (Exception $ex) {
            die($ex);
        }
    }

    public function result(Request $request)
    {
        $validator = validator($request->all(), [
            'paymentId' => 'required'
        ]);
        if ($validator->fails()) {
            return redirect()->route('frontend.home')->with('error', trans('process_failure'));
        }
        return $this->orderSuccessAction($request->paymentId);
    }

    public function cancel()
    {
        return redirect()->route('frontend.home')->with('error', trans('process_failure'));
    }
}
