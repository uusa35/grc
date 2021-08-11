<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserExtraLightResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Search\UserFilters;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public $element;

    public function __construct(User $user)
    {
        $this->element = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = User::active()->paginate(Self::TAKE_LESS);
        return response()->json(UserExtraLightResource::collection($elements), 200);
    }

    public function search(UserFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = $this->element->filters($filters)->active()->notAdmins()->orderBy('id', 'desc')->paginate(self::TAKE_MID);
        if (!$elements->isEmpty()) {
            return response()->json(UserExtraLightResource::collection($elements), 200);
        } else {
            return response()->json(['message' => trans('general.no_users')], 400);
        }
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
        $element = User::whereId($id)->first();
        return response()->json(new UserResource($element), 200);
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
}
