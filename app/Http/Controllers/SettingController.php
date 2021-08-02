<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Setting::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $element = Setting::with('images')->first();
        return inertia('Setting/SettingIndex', compact('element'));
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
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        $themes = explode(",", env('THEMES'));
        return inertia('Setting/SettingEdit', compact('setting', 'themes'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
        ]);
        $element = $setting->update($request->except('image', 'images', 'qr', 'app_log', 'shipment_prices'));
        if ($element) {
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], false) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->has('images') ? $this->saveGallery($element, $request, 'images', ['1080', '1440'], false) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($element, $request, ['size_chart_image'], ['1080', '1440'], true) : null;
            $request->hasFile('shipment_prices') ? $this->saveMimes($element, $request, ['shipment_prices'], ['1080', '1440'], true) : null;
            $request->hasFile('app_logo') ? $this->saveMimes($element, $request, ['app_logo'], ['1080', '1440'], true) : null;
            return redirect()->route('backend.setting.edit', $setting->id)->with('success', trans('general.process_success'));
        }
        return redirect()->back()->withErrors(trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
