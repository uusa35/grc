<?php

namespace App\Providers;

use App\Models\Setting;
use App\Observers\ProductObserver;
use App\Observers\UserObserver;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Carbon::setLocale(session()->get('locale'));
        Schema::defaultStringLength(191);
        JsonResource::withoutWrapping();
//        User::observe(UserObserver::class);
//        Product::observe(ProductObserver::class);
    }
}
