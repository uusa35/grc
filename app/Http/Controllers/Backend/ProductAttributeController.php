<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductAttributeController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ProductAttribute::class, 'attribute');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate(
            ['product_id' => 'required|integer|exists:products,id']);
        $elements = ProductAttribute::where(['product_id' => request()->product_id])
            ->with('color', 'size', 'product')->orderBy('id','desc')
            ->paginate(Self::TAKE_LESS)
            ->withQueryString()
            ->through(fn($element) => [
                'id' => $element->id,
                'product_id' => $element->product_id,
                'color_id' => $element->color_id,
                'size_id' => $element->size_id,
                'price' => $element->price,
                'qty' => $element->qty,
                'color' => $element->color->only('id','name_ar','name_en'),
                'size' => $element->color->only('id','name_ar','name_en'),
                'product' => $element->product->only('id','price')
            ]);
        return inertia('Backend/ProductAttribute/ProductAttributeIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $validate = validator(request()->all(),
            ['product_id' => 'required|integer|exists:products,id']);
        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors()->first());
        }
        $sizes = Size::active()->select('id','name_ar', 'name_en')->get();
        $colors = Color::active()->select('id','name_ar', 'name_en')->get();
        $element = Product::whereId(request()->product_id)
            ->select('id','price')->first();
        return inertia('Backend/ProductAttribute/ProductAttributeCreate', compact( 'element','colors', 'sizes'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'color_id' => 'required|exists:colors,id',
            'size_id' => 'required|exists:sizes,id',
            'qty' => 'required|integer|min:1',
            'price' => 'required|min:0.5|max:999',
        ]);
        $productAttribute = ProductAttribute::where([
            ['product_id', '=', $request->product_id],
            ['color_id', '=', $request->color_id],
            ['size_id', '=', $request->size_id],
        ])->first();
        if (!is_null($productAttribute) && $productAttribute->id) {
            return redirect()->back()->withErrors(trans('general.progress_failure'));
        } else {
            $element = ProductAttribute::create($request->request->all());
            return redirect()->route('backend.attribute.index', ['product_id' => $request->product_id])->with('success', trans('general.progress_success'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function show(ProductAttribute $attribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductAttribute $attribute)
    {
        $sizes = Size::active()->select('id','name_ar', 'name_en')->get();
        $colors = Color::active()->select('id','name_ar', 'name_en')->get();
        return inertia('Backend/ProductAttribute/ProductAttributeEdit', compact('attribute','colors','sizes'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductAttribute $attribute)
    {
        if($attribute->update($request->all())) {
            return redirect()->route('backend.attribute.index', ['product_id' => $attribute->product_id])->with('success', __('general.progress_success'));
        }
        return redirect()->back()->withErrors(__('general.progress_failure'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductAttribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductAttribute $attribute)
    {
        $productId = $attribute->product_id;
        if ($attribute->delete()) {
            return redirect()->route('backend.attribute.index', ['product_id' => $productId]);
        }
        return redirect()->back()->withErrors('process_failure');
    }
}
