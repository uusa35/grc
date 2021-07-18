<?php

namespace App\Providers;

use App\Http\Resources\TranslationResource;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Translation;
use App\Models\User;
use App\Observers\ProductObserver;
use App\Observers\UserObserver;
use Carbon\Carbon;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Carbon::setLocale(app()->getLocale());
        Schema::defaultStringLength(191);
        Inertia::share([
            'locale' => app()->getLocale(),
            'otherLang' => app()->getLocale() === 'ar' ? 'en' : 'ar',
            'dir' => app()->getLocale() === 'ar' ? 'rtl' : 'ltr',
            'trans' => [
                "en" => Lang::get('general', [], 'en'),
                "ar" => Lang::get('general', [], 'ar'),
            ],
            'auth' => auth()->user(),
            'guest' => auth()->guest(),
            'settings' => Setting::first()
        ]);
//        User::observe(UserObserver::class);
//        Product::observe(ProductObserver::class);
    }
}
