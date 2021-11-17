<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceCollection;
use App\Http\Resources\ServiceExtraLightResource;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Services\Search\Filters;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class FrontendServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Filters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Frontend/Service/FrontendServiceIndex', $validator->errors()->all());
        }
        $elements = new ServiceCollection(Service::active()->filters($filters)
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Frontend/Service/FrontendServiceIndex', compact('elements'));
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
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service, Filters $filters)
    {
        $element = ServiceResource::make($service->load('user', 'timings', 'images', 'ratings', 'user'));
        request()->request->add(['category_id' => $element->categories->pluck('id')->flatten()->unique()->toArray()]);
        $relatedElements = new ServiceCollection(Service::filters($filters)->orderBy('id', 'desc')->paginate(Self::TAKE_FOUR));
        return inertia('Frontend/Service/FrontendServiceShow', compact('element', 'relatedElements'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        //
    }
}
