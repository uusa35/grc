<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendCartController extends Controller
{
    public $cart;

    public function __construct()
    {
//        !session()->has('cart') ? session('cart', []) : null;
    }

    public function index()
    {
        $element = session()->get('cart');
        return inertia('Frontend/Cart/CartIndex', compact('element'));
    }

    public function addItem(Request $request)
    {
//        dd($request->all());
        request()->validate([
            'type' => 'string|required',
            'cart_id' => 'integer|required',
            'element_id' => "integer|required",
            'timing_id' => "integer|exists:timings,id",
            'qty' => "integer|required",
            'price' => "numeric|required",
            'direct_purchase' => 'required|boolean',
            'element_attribute_id' => "integer",
        ]);
        session()->push('cart[1]',rand(11,9999));
        dd(collect(session()->get('cart[1]')));
    }

    public function removeItem(Request $request)
    {
        request()->validate([
            'cart_id' => 'integer|required',
            'type' => 'string|required',
        ]);
        session()->pull('cart', request()->request->all());
        dd(session()->get('cart'));
    }

}
