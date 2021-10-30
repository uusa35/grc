<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AreaCollection;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\CountryExtraLightResource;
use App\Http\Resources\GovernateCollection;
use App\Models\Area;
use App\Models\Country;
use App\Models\Governate;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Area::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new AreaCollection(Area::with('country')->orderBy('id','desc')->paginate(Self::TAKE_MIN));
        return inertia('Backend/Area/AreaIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $countries = new CountryCollection(Country::active()->has('governates','>', 0)->with('governates.areas')->get());
        return inertia('Backend/Area/AreaCreate',compact('countries'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'country_id' => 'required|exists:countries,id',
            'governate_id' => 'required|exists:governates,id',
            'order' => 'numeric|max:99'
        ]);
        if (Area::create($request->all())) {
            return redirect()->route('backend.area.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function show(Area $area)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function edit(Area $area)
    {
        $countries = new CountryCollection(Country::active()->has('governates','>', 0)->with('governates.areas')->get());
        return inertia('Backend/Area/AreaEdit', compact('area','countries'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Area $area)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'governate_id' => 'required|exists:governates,id',
            'order' => 'numeric|max:99'
        ]);
        if ($area->update($request->all())) {
            return redirect()->route('backend.area.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function destroy(Area $area)
    {
        if($area->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
