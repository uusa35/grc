<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class FrontendBookController extends Controller
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
            return inertia('Frontend/Book/FrontendBookIndex', $validator->errors()->all());
        }
        $elements = Book::filters($filters)
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LEAST)
            ->withQueryString()->through(fn($element) => [
                'id' => $element->id,
                'name_ar' => $element->name_ar,
                'name_en' => $element->name_en,
                'created_at' => $element->created_at,
                'price' => $element->price,
                'sale_price' => $element->sale_price,
                'active' => $element->active,
                'image' => $element->image,
                'sku' => $element->sku,
                'on_sale' => $element->on_sale,
                'on_new' => $element->on_new,
                'isOnSale' => $element->isOnSale,
                'exclusive' => $element->exclusive,
                'user' => $element->user->only('id', 'name_ar', 'name_en'),
            ]);
        return inertia('Frontend/Book/FrontendBookIndex', compact('elements'));
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
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        $element = Book::whereId($book->id)->with('user')->first();
        return inertia('Frontend/Book/FrontendBookShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
