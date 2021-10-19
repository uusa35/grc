<?php

namespace App\Http\Controllers;

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
    public function index(Request $request)
    {
        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                'Af2N6biLphIu7aabk-sLdmdnMwjTpoQDebRNlXf83V8cw5-bqNtFtpUFhulW5isq9XU4iUtV7EIgIzvS',
                'EGuHlA5fIkRjmUWpycgjVORv3fUhQodY4pqWFnwe977gY0CSBp2zC-7bbJvHtMq3FcuRQso6c8npe6N4'
            )
        );
        // Create new payer and method
        $payer = new Payer();
        $payer->setPaymentMethod("paypal");

        // Set redirect URLs
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(route('frontend.paypal.return'))
            ->setCancelUrl(route('frontend.paypal.cancel'));

        // Set payment amount
        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal(10);

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

//            return $payment;


            // Get PayPal redirect URL and redirect the customer
            $approvalUrl = $payment->getApprovalLink();

            return redirect()->to($approvalUrl);

            // Redirect the customer to $approvalUrl
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            echo $ex->getCode();
            echo $ex->getData();
            die($ex);
        } catch (Exception $ex) {
            die($ex);
        }
    }

    public function return()
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
