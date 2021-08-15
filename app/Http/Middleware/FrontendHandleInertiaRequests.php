<?php

namespace App\Http\Middleware;

use App\Models\Currency;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Inertia\Middleware;

class FrontendHandleInertiaRequests extends Middleware
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
            'auth' => fn() => $request->user() ? User::whereId($request->user()->id)->with(['role' => function ($q) {
                $q->select('id', 'name', 'name_en', 'name_ar', 'is_super', 'is_admin', 'is_visible', 'is_client', 'is_company', 'is_author');
            }])->first()->only('id','name_ar', 'name_en', 'image', 'role') : null,
            'settings' => fn() => Setting::select('name_ar', 'name_en', 'image', 'twitter',
                'facebook', 'instagram', 'caption_ar', 'caption_en', 'description_ar', 'description_en',
                'address_ar', 'address_en', 'mobile', 'country_ar', 'country_en',
                'whatsapp', 'apple', 'android', 'email',
                'theme')->first(),
            'success' => fn() => $request->session()->get('success'),
            'error' => fn() => $request->session()->get('error'),
            'currencies' => fn() => Currency::active()->get()
        ]);
    }
}
