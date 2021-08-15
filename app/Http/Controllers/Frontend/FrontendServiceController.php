<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class FrontendServiceController extends Controller
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
            return inertia('Frontend/Service/FrontendServiceIndex', $validator->errors()->all());
        }
        $elements = Service::filters($filters)
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString()->through(fn($element) => [
                'id' => $element->id,
                'name_ar' => $element->name_ar,
                'name_en' => $element->name_en,
                'created_at' => $element->created_at,
                'price' => $element->price,
                'active' => $element->active,
                'image' => $element->image,
                'sku' => $element->sku,
                'on_sale' => $element->on_sale,
                'user' => $element->user->only('id', 'name_ar', 'name_en'),
            ]);
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
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        $element = Service::whereId($service->id)->with('user')->first();
        return inertia('Frontend/Book/FrontendBookShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        //
    }
}
