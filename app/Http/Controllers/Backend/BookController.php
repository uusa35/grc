<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class BookController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Book::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Book::active()->onHome()->orderby('order','desc')->paginate(SELF::TAKE_LEAST)->appends(request()->except('page','_token'));
        return inertia('Backend/Book/BookIndex', compact('elements'));
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'product');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Book/BookIndex', $validator->errors()->all());
        }
        $elements = Book::filters($filters)->with('user')->whereHas('user', function ($q) {
            return auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id());
        })->orderBy('id', 'desc')->paginate(Self::TAKE_LEAST)->appends(request()->except(['page','_token']));
        return inertia('Backend/Book/BookIndex', compact('elements'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Book/BookCreate');
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        return inertia('Backend/Book/BookEdit', compact('book'));
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
