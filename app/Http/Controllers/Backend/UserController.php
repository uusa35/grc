<?php

namespace App\Http\Controllers\Backend;

use App\Http\Requests\UserUpdate;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleExtraLightResource;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserExtraLightResource;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Country;
use App\Models\Role;
use App\Models\Subscription;
use App\Models\User;
use App\Services\Search\UserFilters;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.user.search',request()->getQueryString());
    }

    public function search(UserFilters $filters)
    {
        $this->authorize('search', 'user');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new UserCollection(User::filters($filters)->notAdmins()->with('role')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/User/UserIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/User/UserCreate');
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
    public function show(User $user)
    {
        $element = $user->with('role.privileges')->first();
        return inertia('Backend/User/UserShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $user->load('categories','images','country','area','subscription');
        $roles = new RoleCollection(Role::active()->get());
        $categories = new CategoryCollection(Category::active()->onlyParent()->onlyForUsers()->with(['children' => function ($q) {
            return $q->active()->onlyForUsers()->with(['children' => function ($q) {
                return $q->active()->onlyForUsers();
            }]);
        }])->get());
        $elementCategories = $user->categories->pluck('id')->toArray();
        $countries = new CountryCollection(Country::active()->has('areas','>', 0)->with('areas')->get());
        $subscriptions = new SubscriptionCollection(Subscription::active()->get());
        return inertia('Backend/User/UserEdit', compact('user','roles','elementCategories', 'categories', 'countries', 'subscriptions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdate $request, User $user)
    {
        $updated = $user->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr']));
        if ($updated) {
            $request->has('tags') ? $user->tags()->sync($request->tags) : null;
            $request->has('videos') ? $user->videos()->sync($request->videos) : null;
            $request->has('categories') ? $user->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($user, $request, ['image'], ['1080', '1440'], false) : null;
            $request->hasFile('qr') ? $this->saveMimes($user, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($user, $request, 'file') : null;
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.user.edit', $user->id)->with('error', 'process_failure');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->books()->delete();
            $user->products()->delete();
            $user->services()->delete();
            $user->courses()->delete();
            $user->images()->delete();
            $user->slides()->delete();
            $user->tags()->detach();
            $user->comments()->delete();
            $user->favorites()->delete();
            $user->categories()->detach();
            $user->delete();
            return redirect()->back();
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->withErrors($e->getMessage());
        }
    }
}
