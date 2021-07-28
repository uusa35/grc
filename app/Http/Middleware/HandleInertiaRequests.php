<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            // Synchronously
            'appName' => config('app.name'),
            // Lazily
            'auth' => fn() => $request->user() ? User::whereId($request->user()->id)->with(['role' => function ($q) {
                return $q->with(['privileges' => function ($q) {
                    return $q->orderBy('order', 'asc');
                }]);
            }])->first() : null,
            'translations' => [
                "en" => Lang::get('general', [], 'en'),
                "ar" => Lang::get('general', [], 'ar'),
            ],
            'settings' => Setting::first(),
            'success' => session()->has('success') ? session()->get('success') : null,
            'error' => session()->has('error') ? session()->get('error') : null,
        ]);
    }
}
