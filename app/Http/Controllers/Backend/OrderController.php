<?php

namespace App\Http\Controllers\Backend;

use App\Exports\OrdersExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Models\Product;
use App\Notifications\OrderPaid;
use App\Services\Search\Filters;
use App\Services\Search\OrderFilters;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Order::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.order.search', request()->getQueryString());
    }

    public function search(OrderFilters $filters)
    {
        $this->authorize('search', 'order');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new OrderCollection(Order::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Order/OrderIndex', compact('elements'));
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
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        $order->load('order_metas.ordermetable', 'user', 'coupon');
        return inertia('Backend/Order/OrderShow', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        if ($order->order_metas()->delete() && $order->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function switchStatus(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|string'
        ]);
        try {
            $updated = Order::whereId($request->order_id)->first()->update(['status' => $request->status]);
            if ($updated) {
                return redirect()->back()->with('success', trans('general.process_success'));
            }
            return redirect()->back()->with('error', trans('general.process_failure'));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function export(OrderFilters $filters)
    {
        $this->authorize('search', 'product');
        $elements = Order::filters($filters)
            ->with(['user' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc');
        return Excel::download(new OrdersExport($elements), 'elements.xlsx');
//        return Excel::download(new ProductsExport($elements), 'elements.pdf');
    }

}
