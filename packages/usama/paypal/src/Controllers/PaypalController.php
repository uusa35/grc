<?php

namespace Usama\Paypal\Controllers;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class PaypalController extends Controller
{
    public function makePayment(Request $request)
    {
        $validator = validator($request->all(), ['netTotal' => 'required|numeric', 'order_id' => 'required|exists:orders,id']);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->first());
        }
        $clientId = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_secret_client_id') : config('paypal.live_secret_client_id');
        $clientSecret = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_client_secret') : config('paypal.live_client_secret');
        $apiContext = new \PayPal\Rest\ApiContext(new \PayPal\Auth\OAuthTokenCredential($clientId,$clientSecret));
        // Create new payer and method
        $payer = new Payer();
        $payer->setPaymentMethod("paypal");

        // Set redirect URLs
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(route('paypal.web.payment.result'))
            ->setCancelUrl(route('paypal.web.payment.cancel'));

        // Set payment amount
        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal($request->netTotal);

        // Set transaction object
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setDescription("Payment description");

        // Create the full payment object
        $payment = new Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions(array($transaction));
        // Create payment with valid API context
        try {
            $payment->create($apiContext);
            // Get PayPal redirect URL and redirect the customer
            return $payment;
            $approvalUrl = $payment->getApprovalLink();

            return response()->json($approvalUrl, 200);

            // Redirect the customer to $approvalUrl
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            echo $ex->getCode();
            echo $ex->getData();
            die($ex);
        } catch (Exception $ex) {
            die($ex);
        }
    }

    public function result()
    {
        dd(request()->all());
//        array:3 [▼
//  "paymentId" => "PAYID-MFXAH7Q55B2291688002742W"
//  "token" => "EC-9NP97130FK180431L"
//  "PayerID" => "JFG5A5CSF2AE4"
//]
    }

    public function cancel()
    {
        return ('cancel');
    }
}
