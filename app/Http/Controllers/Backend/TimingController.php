<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Timing;
use Illuminate\Http\Request;

class TimingController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Timing::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate(
            ['service_id' => 'required|integer|exists:services,id']);
        $elements = Timing::where(['service_id' => request()->service_id])->with('service')->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)->appends(request()->except(['page', '_token']));
        return inertia('Backend/Timing/TimingIndex', compact('elements'));
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'service');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Timing::filters($filters)->with('service')->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)->appends(request()->except(['page', '_token']));
        return inertia('Backend/Timing/TimingIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        request()->validate([
            'service_id' => "required|exists:services,id"
        ]);
        return inertia('Backend/Timing/TimingCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        dd($request->all());
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'notes_ar' => 'max:1000',
            'notes_en' => 'max:1000'
        ]);
        Timing::create($request->request->all());
        return redirect()->route('backend.timing.index', ['service_id' => $request->service_id])->with('success', 'progress_success');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function show(Timing $timing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function edit(Timing $timing)
    {
        return inertia('Backend/Timing/TimingEdit', compact('timing'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Timing $timing)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'start' => 'required|time',
            'end' => 'required|time',
            'notes_ar' => 'max:1000',
            'notes_en' => 'max:1000'
        ]);
        if ($timing->update($request->all())) {
            return redirect()->route('backend.timing.index', ['service_id' => $timing->service_id])->with('success', __('general.progress_success'));
        }
        return redirect()->back()->withErrors('progress_failure');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timing $timing)
    {
        $serviceId = $timing->service_id;
        if ($timing->delete()) {
            return redirect()->route('backend.timing.index', ['service_id' => $serviceId]);
        }
        return redirect()->back()->withErrors('process_failure');
    }
}
