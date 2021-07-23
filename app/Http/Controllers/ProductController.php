<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStore;
use App\Http\Resources\ProductExtraLightResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Integer;

class ProductController extends Controller
{
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
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
//        dd(request()->getQueryString());
        $elements = Product::filters($filters)->with('product_attributes', 'color', 'size', 'user')->orderBy('id', 'desc')->paginate(Self::TAKE_LEAST);
//        dd($elements);
        return inertia('Product/ProductIndex', compact('elements'));
        return redirect()->to('backend/product/search?'.request()->getQueryString(), compact('elements'));
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
//            dd($element);
            return redirect()->route('backend.product.edit', $element->id)->with('success', trans('process_success'));
        }
        return redirect()->route('backend.product.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $element = Product::whereId($id)->with('product_attributes', 'color', 'size', 'user', 'images', 'user')->first();
        return inertia('Product/ProductShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $element = Product::whereId($id)->with('product_attributes', 'color', 'size', 'user', 'images', 'user','categories')->first();
        return inertia('Product/ProductEdit', compact('element'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
