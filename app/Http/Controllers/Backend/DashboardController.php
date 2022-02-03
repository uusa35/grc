<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChartCollection;
use App\Http\Resources\ChartResource;
use App\Models\Order;
use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use App\Services\Traits\DashboardTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use LaravelDaily\LaravelCharts\Classes\LaravelChart;

class DashboardController extends Controller
{
    use DashboardTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $previousYear = DB::table('orders')
            ->select('net_price',
                'created_at',
//                DB::raw('YEAR(created_at) as year'),
                DB::raw("DATE_FORMAT(created_at,'%M') as month"),
//                DB::raw("DATE_FORMAT(created_at,'%m%Y') as month_year"),
//                DB::raw("DATE_FORMAT(created_at,'%M %Y') as month_and_year"),
//                DB::raw("DATE_FORMAT(created_at,'%Y') as year"),
            )
//            ->where('paid', true)
            ->whereYear('created_at', '=', Carbon::now()->subYear())
            ->orderBy('created_at')
            ->get()
            ->groupBy('month');
        $currentYear = DB::table('orders')
            ->select('net_price',
                'created_at',
                DB::raw("DATE_FORMAT(created_at,'%M') as month"),
            )
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->orderBy('created_at')
            ->get()
            ->groupBy('month');
        $previousYearChart = $previousYear->isNotEmpty() ? new ChartCollection($previousYear) : null;
        $currentYearChart = $currentYear->isNotEmpty() ? new ChartCollection($currentYear) : null;
        return inertia('Backend/BackendHomePage', compact('previousYearChart', 'currentYearChart'));
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
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function back()
    {
        return redirect()->back();
    }

}
