<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendCartController extends Controller
{
    public function index()
    {
        return inertia('Frontend/Cart/CartIndex');
    }

    public function getUserInformation() {
        return inertia('Frontend/Cart/CartUserInformation');
    }

    public function getUserConfirmation() {
        return inertia('Frontend/Cart/CartUserConfirmation');
    }

    public function getPaymentIndex() {
        return inertia('Frontend/Cart/CartPaymentIndex');
    }

}
