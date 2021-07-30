<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductAttribute;
use Illuminate\Http\Request;

class ProductAttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()->isAdminOrAbove) {
            $element = Product::whereId(request()->product_id)->with('product_attributes.color','product_attributes.size')->first();
        } else {
            $element = Product::whereId(['product_id' => request()->product_id, 'user_id' => auth()->id()])->with('product_attributes.color','product_attributes.size')->first();
        }
        if ($element) {
            return inertia('ProductAttribute/ProductAttributeIndex', compact('element'));
        }
        return redirect()->route('backend.product.search')->withErrors(trans('general.no_elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (auth()->user()->isAdminOrAbove) {
            $element = Product::whereId(request()->product_id)->with('product_attributes')->first();
        } else {
            $element = Product::whereId(['product_id' => request()->product_id, 'user_id' => auth()->id()])->with('product_attributes')->first();
        }
        if ($element) {
            return inertia('ProductAttribute/ProductAttributeCreate', compact('element'));
        }
        return redirect()->route('backend.product.search')->withErrors(trans('general.no_elements'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\ProductAttribute $productAttribute
     * @return \Illuminate\Http\Response
     */
    public function show(ProductAttribute $productAttribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\ProductAttribute $productAttribute
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductAttribute $productAttribute)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\ProductAttribute $productAttribute
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductAttribute $productAttribute)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\ProductAttribute $productAttribute
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductAttribute $productAttribute)
    {
        //
    }
}
