<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthExtraLightResource;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\UserLightResource;
use App\Http\Resources\UserResource;
use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;

class FrontendCartController extends Controller
{
    public function index()
    {
        return inertia('Frontend/Cart/CartIndex');
    }

    public function getUserInformation() {
        $countries = new CountryCollection(Country::active()->has('areas','>', 0)->with('areas')->get());
        $auth = auth()->id() ? new UserResource(User::whereId(request()->user()->id)->with(['role','country'])->first()) : null;
        return inertia('Frontend/Cart/CartUserInformation', compact('countries', 'auth'));
    }

    public function getUserConfirmation() {
        return inertia('Frontend/Cart/CartUserConfirmation');
    }

    public function getPaymentIndex() {
        return inertia('Frontend/Cart/CartPaymentIndex');
    }

}
