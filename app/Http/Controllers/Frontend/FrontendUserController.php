<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Http\Resources\ServiceCollection;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use App\Services\Search\UserFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FrontendUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserFilters  $filters)
    {
//        dd(Category::active()->onlyParent()->with('children.children')->first());
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new UserCollection(User::filters($filters)->notAdmins()->notClients()
            ->paginate(SELF::TAKE_LESS)
            ->withQueryString());
        return inertia('Frontend/User/FrontendUserIndex', compact('elements'));
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $element = new UserResource($user->load('role','books','images','ratings'));
        return inertia('Frontend/User/FrontendUserShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);
        $user = new UserResource($user->load('role'));
        return inertia('Frontend/User/FrontendUserEdit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name_ar' => 'required|min:3|max:255',
            'name_en' => 'required|min:3|max:255',
            'mobile' => 'required|min:6|max:12',
            'whatsapp' => 'min:5|max:12',
            'news_letter_on' => 'boolean'
        ]);
        $updated = $user->update($request->except(['_token', 'image']));
        if ($updated) {
            $request->hasFile('image') ? $this->saveMimes($user, $request, ['image'], ['500', '500'], false) : null;
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    public function getResetPassword() {
        return inertia('Frontend/User/Profile/ProfileResetPassword');
    }

    public function postResetPassword(Request $request) {
        $request->validate([
            'old_password' => 'required|min:6',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $user = auth()->attempt(['email' => auth()->user()->email, 'password' => $request->old_password]);
        if($user && auth()->user()->update(['password' => Hash::make($request->password)])) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function getCourses() {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Course');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = CourseCollection::make(Course::whereIn('id', $ids)->with('images','user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileCourseIndex', compact('elements','firstOrder'));
    }

    public function getCourse(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Course']);
        }])->get();
        if(in_array(request()->id,$order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new CourseResource(Course::whereId($request->id)->with('user','images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return inertia('Frontend/User/Profile/ProfileCourseShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getServices() {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Service');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = ServiceCollection::make(Service::whereIn('id', $ids)->with('images','user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileServiceIndex', compact('elements','firstOrder'));
    }

    public function getService(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Service']);
        }])->get();
        if(in_array(request()->id,$order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new ServiceResource(Service::whereId($request->id)->with('user','images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return inertia('Frontend/User/Profile/ProfileServiceShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getBooks() {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Book');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = ServiceCollection::make(Book::whereIn('id', $ids)->with('images','user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileBookIndex', compact('elements','firstOrder'));
    }

    public function getBook(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Book']);
        }])->get();
        if(in_array(request()->id,$order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new ServiceResource(Book::whereId($request->id)->with('user','images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return inertia('Frontend/User/Profile/ProfileBookShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getFavorites() {
        return inertia('Frontend/User/Profile/ProfileFavoriteIndex');
    }

    public function getSettings() {
        $user = new UserResource(User::whereId(auth()->id())->first());
        return inertia('Frontend/User/Profile/ProfileSettingIndex', compact('user'));
    }
}
