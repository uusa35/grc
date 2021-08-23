<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthExtraLightResource;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\SettingExtraLightResource;
use App\Models\Category;
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
            'auth' => fn() => $request->user() ? AuthExtraLightResource::make(User::whereId($request->user()->id)->with('role','favoritesList','orders')->first()) : null,
            'settings' => fn() => new SettingExtraLightResource(Setting::first()),
            'success' => fn() => $request->session()->get('success'),
            'error' => fn() => $request->session()->get('error'),
            'currencies' => fn() => Currency::active()->get(),
            'cart' => fn() => session()->get('cart'),
            'categories' => fn() => CategoryCollection::make(Category::active()->onlyParent()
                ->with(['children' => function ($q) {
                    $q->active()->orderBy('order', 'asc')->with(['children' => function ($q) {
                        $q->active()->orderBy('order', 'asc');
                    }]);
                }])
                ->orderBy('order', 'asc')
                ->get()),
        ]);
    }
}
