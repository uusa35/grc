<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use App\Services\Search\Filters;
use Illuminate\Http\Request;

class SlideController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Slide::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $validate = validator(request()->all(), [
            'slidable_id' => 'required|integer',
            'slidable_type' => 'required|string'
        ]);
        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate->errors()->first());
        }
        $className = 'App\Models\\' . ucfirst(request()->slidable_type);
        $element = new $className();
        $element = $element->whereId(request()->slidable_id)->first();
        $elements = $element->slides()->orderBy('id', 'desc')->paginate(Self::TAKE_LESS);
        return inertia('Backend/Slide/SlideIndex', compact('elements'));
    }

    public function search(Filters $filters)
    {
        $this->authorize('search', 'slide');
        $elements = Slide::filters($filters)->with(['slidable' => function ($q) {
            if (request()->slidable_type !== 'user' && !auth()->user()->isAdminOrAbove) {
                return $q->whereHas('user', function ($q) {
                    return $q->where('id', auth()->id());
                });
            } else {
                return $q;
            }
        }])->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)->appends(request()->except(['page','_token']));
        return inertia('Backend/Slide/SlideIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Slide/SlideCreate');
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
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function show(Slide $slide)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function edit(Slide $slide)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Slide $slide)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slide $slide)
    {
        //
    }
}
