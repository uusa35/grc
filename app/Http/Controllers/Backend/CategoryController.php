<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use App\Services\Search\CategoryFilters;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new CategoryCollection(Category::where(['is_parent' => true])->with('children.children')->paginate(2));
        return inertia('Backend/Category/CategoryIndex', compact('elements'));
    }

    public function search(CategoryFilters $filters)
    {
        $this->authorize('search', 'category');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Category::filters($filters)->orderBy('id', 'desc')->paginate(Self::TAKE_MIN);
        return inertia('Backend/Category/CategoryIndex', compact('elements'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Category/CategoryCreate');
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
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        return inertia('Backend/Category/CategoryEdit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        request()->validate([
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'caption_ar' => 'required|max:1000',
            'caption_en' => 'required|max:1000',
            'order' => 'integer'
        ]);
        if ($category->update($request->except('image','image_rectangle','file'))) {
            $request->hasFile('image') ? $this->saveMimes($category, $request, ['image'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($category, $request, 'file') : null;
            $request->hasFile('image_rectangle') ? $this->saveMimes($category, $request, ['image_rectangle'], ['1440', '1080'], false) : null;
            return redirect()->route('backend.category.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
