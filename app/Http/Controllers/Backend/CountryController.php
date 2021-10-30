<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryCollection;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Country::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new CountryCollection(Country::orderBy('id', 'desc')->paginate(Self::TAKE_MIN));
        return inertia('Backend/Country/CountryIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Country/CountryCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'calling_code' => 'numeric',
            'country_code' => 'string|max:3',
            'currency_symbol_ar' => 'string|max:5',
            'currency_symbol_en' => 'string|max:5',
            'fixed_shipment_charge' => 'numeric|max:99',
            'order' => 'numeric|max:99',
            'image' => 'required',
            'is_local' => 'required|boolean',
            'active' => 'required|boolean',
            'has_currency' => 'required|boolean',
        ]);
        $country = Country::create($request->except('image'));
        if ($country) {
            $request->hasFile('image') ? $this->saveMimes($country, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.country.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function edit(Country $country)
    {
        return inertia('Backend/Country/CountryEdit', compact('country'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'calling_code' => 'numeric',
            'country_code' => 'string|max:3',
            'currency_symbol_ar' => 'string|max:5',
            'currency_symbol_en' => 'string|max:5',
            'fixed_shipment_charge' => 'numeric|max:99',
            'order' => 'numeric|max:99',
            'is_local' => 'required|boolean',
            'active' => 'required|boolean',
        ]);
        if ($country->update($request->except('image'))) {
            $request->hasFile('image') ? $this->saveMimes($country, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.country.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        //
    }
}
