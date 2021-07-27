<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStore;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Product::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Product::with('product_attributes', 'color', 'size')->paginate(SELF::TAKE_LEAST);
        return inertia('Product/ProductIndex', compact('elements'));
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'product');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Product::filters($filters)->with('product_attributes', 'color', 'size', 'user')->orderBy('id', 'desc')->whereHas('user', function ($q) {
            return auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id());
        })->paginate(Self::TAKE_LEAST);
        return inertia('Product/ProductIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->companies()->get();
        $sizes = Size::active()->get();
        $colors = Color::active()->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForProducts()->with(['children' => function ($q) {
                return $q->onlyForProducts();
            }]);
        }])->get();
        return inertia('Product/ProductCreate', compact('users', 'sizes', 'colors', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStore $request)
    {
        //        dd($request->images);
//        $end_sale = $request->has('end_sale') ? Carbon::parse(str_replace('-', '', $request->end_sale))->toDateTimeString() : null;
//        $start_sale = $request->has('start_sale') ? Carbon::parse(str_replace('-', '', $request->start_sale))->toDateTimeString() : null;
        $element = Product::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->update([
//                'start_sale' => $start_sale ? $start_sale : null,
//                'end_sale' => $end_sale ? $end_sale : null,
//                'sale_price' => $request->sale_price ? $request->sale_price : $request->price
            ]);
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], true) : null;
            $request->has('images') ? $this->saveGallery($element, $request, 'images', ['1080', '1440'], true) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($element, $request, ['size_chart_image'], ['1080', '1440'], true) : null;
            return redirect()->route('backend.product.edit', $element->id)->with('success', trans('process_success'));
        }
        return redirect()->route('backend.product.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $element = $product->with('product_attributes', 'color', 'size', 'user', 'images', 'user')->first();
        return inertia('Product/ProductShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $users = User::active()->companies()->get();
        $sizes = Size::active()->get();
        $colors = Color::active()->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForProducts()->with(['children' => function ($q) {
                return $q->onlyForProducts();
            }]);
        }])->get();
        $product = $product->whereId($product->id)->with('images', 'user', 'categories')->first();
        $productCategories = $product->categories->pluck('id')->toArray();
        return inertia('Product/ProductEdit', compact('users', 'sizes', 'colors', 'categories', 'product', 'productCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
//        $element = Product::whereId($product->id)->first();
        $updated = $product->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($product) {
            $product->update([
//                'start_sale' => $start_sale ? $start_sale : null,
//                'end_sale' => $end_sale ? $end_sale : null,
//                'sale_price' => $request->sale_price ? $request->sale_price : $request->price
            ]);
            $product->tags()->sync($request->tags);
            $product->videos()->sync($request->videos);
            $product->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($product, $request, ['image'], ['1080', '1440'], true) : null;
            $request->hasFile('qr') ? $this->saveMimes($product, $request, ['qr'], ['300', '300'], true) : null;
            $request->has('images') ? $this->saveGallery($product, $request, 'images', ['1080', '1440'], true) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($product, $request, ['size_chart_image'], ['1080', '1440'], true) : null;
            return redirect()->route('backend.product.edit', $product->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.product.edit', $product->id)->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->product_attributes()->delete();
        $product->images()->delete();
        $product->slides()->delete();
        $product->categories()->delete();
        $product->delete();
        return redirect()->back();
    }
}
