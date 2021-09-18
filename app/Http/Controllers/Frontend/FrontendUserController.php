<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
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
        $elements = new UserCollection(User::filters($filters)->notAdmins()->authors()
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
            'whatsapp' => 'min:5|max:12'
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
        $elements = CourseCollection::make($orders->pluck('order_metas')->flatten()->pluck('ordermetable'));
        return inertia('Frontend/User/Profile/ProfileCourseIndex', compact('elements'));
    }

    public function getCourse(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id'
        ]);
        $order = Order::where(['reference_id' => $request->reference_id, 'paid' => true])->first();
        if($order) {
            $element = new CourseResource(Course::whereId($request->id)->first());
            return inertia('Frontend/User/Profile/ProfileCourseShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getServices() {
        return inertia('Frontend/User/Profile/ProfileServiceIndex');
    }

    public function getService(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:services,id'
        ]);
        $order = Order::where(['reference_id' => $request->reference_id, 'paid' => true])->first();
        if($order) {
            $element = new ServiceResource(Service::whereId($request->id)->first());
            return inertia('Frontend/User/Profile/ProfileServiceShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getBooks() {
        return inertia('Frontend/User/Profile/ProfileBookIndex');
    }

    public function getBook(Request $request) {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:services,id'
        ]);
        $order = Order::where(['reference_id' => $request->reference_id, 'paid' => true])->first();
        if($order) {
            $element = new ServiceResource(Service::whereId($request->id)->first());
            return inertia('Frontend/User/Profile/ProfileServiceShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getFavorites() {
        return inertia('Frontend/User/Profile/ProfileFavoriteIndex');
    }

    public function getSettings() {
        return inertia('Frontend/User/Profile/ProfileSettingIndex');
    }
}
