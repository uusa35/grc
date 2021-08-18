<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FrontendCartController extends Controller
{
    public $cart;

    public function __construct()
    {
        $this->cart = session()->has('cart') ? session()->get('cart') : collect([]);
    }

    public function index()
    {
        $element = session()->get('cart');
        return inertia('Frontend/Cart/CartIndex', compact('element'));
    }

    public function addItem(Request $request)
    {
        request()->validate([
            'cart_id' => 'integer|required',
            'type' => 'string|required',
            'element_id' => "integer|required",
            'element_attribute_id' => "integer",
            'qty' => "integer|required",
            'element' => 'required'
        ]);
        session()->push('cart', collect($request->request->all()));
        dd(session()->get('cart'));
    }

    public function removeItem(Request $request)
    {
        request()->validate([
            'cart_id' => 'integer|required',
            'type' => 'string|required',
        ]);
        $this->cart->pull(request()->request->all());
        dd($this->cart);
    }

}
