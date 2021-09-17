<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Category;
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
        return inertia('Frontend/User/Profile/FrontendResetPassword');
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
        return inertia('Frontend/User/Profile/FrontendUserCourseIndex');
    }

    public function getServices() {
        return inertia('Frontend/User/Profile/FrontendUserServiceIndex');
    }

    public function getBooks() {
        return inertia('Frontend/User/Profile/FrontendUserBookIndex');
    }

    public function getFavorites() {
        return inertia('Frontend/User/Profile/FrontendUserFavoriteIndex');
    }

    public function getSettings() {
        return inertia('Frontend/User/Profile/FrontendUserSettingIndex');
    }
}
