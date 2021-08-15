<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class FrontendProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProductFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Product/ProductIndex', $validator->errors()->all());
        }
        $elements = Product::filters($filters)->with('product_attributes', 'color', 'size')
            ->with(['user' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString()->through(fn($element) => [
                'id' => $element->id,
                'name_ar' => $element->name_ar,
                'name_en' => $element->name_en,
                'created_at' => $element->created_at,
                'price' => $element->price,
                'active' => $element->active,
                'image' => $element->image,
                'sku' => $element->sku,
                'has_attributes' => $element->has_attributes,
                'on_sale' => $element->on_sale,
                'user' => $element->user->only('id', 'name_ar', 'name_en'),
                'color' => $element->color->only('name_ar', 'name_en'),
                'size' => $element->size->only('name_ar', 'name_en'),
                'product_attributes' => $element->product_attributes->only('id', 'color_id', 'size_id', 'color.name', 'size.name'),
            ]);
        return inertia('Frontend/Product/FrontendProductIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $element = Product::whereId($product->id)->with('images','product_attributes.color','product_attributes.size','color','size')->first();
        return inertia('Frontend/Product/FrontendProductShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
