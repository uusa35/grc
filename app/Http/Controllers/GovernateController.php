<?php

namespace App\Http\Controllers;

use App\Http\Resources\GovernateCollection;
use App\Models\Governate;
use Illuminate\Http\Request;

class GovernateController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Governate::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new GovernateCollection(Governate::with('country')->paginate(Self::TAKE_LESS));
        return inertia('Backend/Governate/GovernateIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Governate/GovernateCreate');
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
     * @param  \App\Models\Governate  $governate
     * @return \Illuminate\Http\Response
     */
    public function show(Governate $governate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Governate  $governate
     * @return \Illuminate\Http\Response
     */
    public function edit(Governate $governate)
    {
        $governate->load('country');
        return inertia('Backend/Governate/GovernateEdit', compact('governate'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Governate  $governate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Governate $governate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Governate  $governate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Governate $governate)
    {
        //
    }
}
