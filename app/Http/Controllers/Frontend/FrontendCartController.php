<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendCartController extends Controller
{
    public $cart;

    public function __construct()
    {
        $this->cart = collect(session()->has('cart') ? session()->get('cart') : session()->put('cart', []));
    }

    public function getItems()
    {

    }

    public function addItemToCart(Request $request)
    {
        request()->validate([
            'cart_id' => 'integer|required',
            'type' => 'string|required',
            'element_id' => "integer|required",
            'element_attribute_id' => "integer",
            'qty' => "integer|required",
            'element' => 'required'
        ]);
        $this->cart->add(request()->request->all());
    }
}
