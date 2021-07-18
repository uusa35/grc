<?php

namespace App\Providers;

use App\Policies\AddonPolicy;
use App\Policies\AreaPolicy;
use App\Policies\BranchPolicy;
use App\Policies\BrandPolicy;
use App\Policies\CategoryGroupPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\ClassifiedPolicy;
use App\Policies\CollectionPolicy;
use App\Policies\ColorPolicy;
use App\Policies\CommentPolicy;
use App\Policies\CommercialPolicy;
use App\Policies\CountryPolicy;
use App\Policies\CouponPolicy;
use App\Policies\CurrencyPolicy;
use App\Policies\DayPolicy;
use App\Policies\DevicePolicy;
use App\Policies\GovernatePolicy;
use App\Policies\ImagePolicy;
use App\Policies\ItemPolicy;
use App\Policies\NotificationPolicy;
use App\Policies\OrderPolicy;
use App\Policies\PagePolicy;
use App\Policies\PolicyPolicy;
use App\Policies\PostPolicy;
use App\Policies\PrivilegePolicy;
use App\Policies\ProductPolicy;
use App\Policies\PropertyPolicy;
use App\Policies\RolePolicy;
use App\Policies\ServicePolicy;
use App\Policies\SettingPolicy;
use App\Policies\ShipmentPackagePolicy;
use App\Policies\SizePolicy;
use App\Policies\SlidePolicy;
use App\Policies\TagPolicy;
use App\Policies\TermPolicy;
use App\Policies\TimingPolicy;
use App\Policies\UserPolicy;
use App\Policies\VideoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::resource('user', UserPolicy::class);
        Gate::resource('product', ProductPolicy::class);
        Gate::resource('service', ServicePolicy::class);
        Gate::resource('country', CountryPolicy::class);
        Gate::resource('currency', CurrencyPolicy::class);
        Gate::resource('area', AreaPolicy::class);
        Gate::resource('governate', GovernatePolicy::class);
        Gate::resource('role', RolePolicy::class);
        Gate::resource('privilege', PrivilegePolicy::class);
        Gate::resource('category', CategoryPolicy::class);
        Gate::resource('slide', SlidePolicy::class);
        Gate::resource('video', VideoPolicy::class);
        Gate::resource('tag', TagPolicy::class);
        Gate::resource('size', SizePolicy::class);
        Gate::resource('color', ColorPolicy::class);
        Gate::resource('collection', CollectionPolicy::class);
        Gate::resource('timing', TimingPolicy::class);
        Gate::resource('day', DayPolicy::class);
        Gate::resource('order', OrderPolicy::class);
        Gate::resource('image', ImagePolicy::class);
        Gate::resource('brand', BrandPolicy::class);
        Gate::resource('branch', BranchPolicy::class);
        Gate::resource('coupon', CouponPolicy::class);
        Gate::resource('page', PagePolicy::class);
        Gate::resource('post', PostPolicy::class);
        Gate::resource('term', TermPolicy::class);
        Gate::resource('policy', PolicyPolicy::class);
        Gate::resource('notification', NotificationPolicy::class);
        Gate::resource('shipment', ShipmentPackagePolicy::class);
        Gate::resource('setting', SettingPolicy::class);
        Gate::resource('commercial', CommercialPolicy::class);
        Gate::resource('device', DevicePolicy::class);
        Gate::resource('classified', ClassifiedPolicy::class);
        Gate::resource('property', PropertyPolicy::class);
        Gate::resource('group', CategoryGroupPolicy::class);
        Gate::resource('addon', AddonPolicy::class);
        Gate::resource('item', ItemPolicy::class);
        Gate::resource('comment', CommentPolicy::class);

        Gate::define('superOne', function () {
            return auth()->user()->isSuper && auth()->id() === 1;
        });

        Gate::define('isAdminOrAbove', function () {
            return auth()->user()->isAdminOrAbove; // means if isSuper or isAdmin then go ahead
        });

        Gate::define('isAdmin', function () {
            return auth()->user()->isAdmin; // means if isSupern then go ahead
        });

        Gate::define('isSuper', function () {
            return auth()->user()->isSuper;
        });

        Gate::define('isCompanyOrAbove', function () {
            return auth()->user()->isAdminOrAbove ? auth()->user()->isAdminOrAbove : auth()->user()->role->is_company;
        });

        Gate::define('isCompany', function () {
            return auth()->user()->role->is_company;
        });

        Gate::define('isDesigner', function () {
            return auth()->user()->role->is_designer;
        });

        Gate::define('index', function ($user, $index) {
            if ($user->role->privileges->where('name', $index)->first()) {
                return $user->role->privileges->where('name', $index)->first()->pivot->index;
            }
            return false;
        });
    }
}
