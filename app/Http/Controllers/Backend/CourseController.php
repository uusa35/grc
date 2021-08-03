<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Slide;
use App\Services\Search\Filters;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Course::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Slide::paginate(SELF::TAKE_LEAST)->appends(request()->except(['page','_token']));
        return inertia('Backend/Course/CourseIndex', compact('elements'));
    }

    public function search(Filters $filters)
    {
        $this->authorize('search', 'course');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Course::filters($filters)->with('user')->orderBy('id', 'desc')->whereHas('user', function ($q) {
            return auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id());
        })->paginate(Self::TAKE_LEAST)->appends(request()->except(['page','_token']));
        return inertia('Backend/Course/CourseIndex', compact('elements'));
        return redirect()->to('backend/course/search?' . request()->getQueryString(), compact('elements'));
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
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}
