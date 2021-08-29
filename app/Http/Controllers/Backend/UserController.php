<?php

namespace App\Http\Controllers\Backend;

use App\Http\Resources\UserExtraLightResource;
use App\Http\Controllers\Controller;
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
        return redirect()->route('backend.user.search');
    }

    public function search(UserFilters $filters)
    {
        $this->authorize('search', 'user');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = User::filters($filters)->notAdmins()->with('role')->paginate(Self::TAKE_LESS)
            ->withQueryString()->through(fn($element) => [
                'id' => $element->id,
                'name_ar' => $element->name_ar,
                'name_en' => $element->name_en,
                'created_at' => $element->created_at,
                'active' => $element->active,
                'role' => $element->role->only('name_ar','name_en')
            ]);
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
        $element = $user->whereId($user->id)->with('categories', 'images')->first();
        return inertia('Backend/User/UserShow', compact('element'));
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
