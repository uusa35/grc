<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\User;
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
        $elements = Book::onHome()->orderby('id', 'desc')->paginate(SELF::TAKE_LEAST)->appends(request()->except('page', '_token'));
        return inertia('Backend/Book/BookIndex', compact('elements'));
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'book');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Book/BookIndex', $validator->errors()->all());
        }
        $elements = Book::filters($filters)->with('user')->whereHas('user', function ($q) {
            return auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id());
        })->orderBy('id', 'desc')->paginate(Self::TAKE_LEAST)->appends(request()->except(['page', '_token']));
        return inertia('Backend/Book/BookIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForBooks()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        return inertia('Backend/Book/BookCreate', compact('users', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $element = Book::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], false) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->has('images') ? $this->saveGallery($element, $request, 'images', ['1080', '1440'], false) : null;
            return redirect()->route('backend.book.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.book.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        $book = $book->whereId($book->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $book->categories->pluck('id')->toArray();
        return inertia('Backend/Book/BookEdit', compact('book', 'users', 'categories', 'elementCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        //
    }
}
