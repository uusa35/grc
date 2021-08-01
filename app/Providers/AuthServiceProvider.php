<?php

namespace App\Providers;

use App\Models\Color;
use App\Models\Page;
use App\Models\Privilege;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\User;
use App\Policies\AddonPolicy;
use App\Policies\AreaPolicy;
use App\Policies\BookPolicy;
use App\Policies\BranchPolicy;
use App\Policies\BrandPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\ColorPolicy;
use App\Policies\CommentPolicy;
use App\Policies\CommercialPolicy;
use App\Policies\CountryPolicy;
use App\Policies\CouponPolicy;
use App\Policies\CoursePolicy;
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
use App\Policies\ProductAttributePolicy;
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
        Product::class => ProductPolicy::class,
        ProductAttribute::class => ProductAttributePolicy::class,
        Service::class => ServicePolicy::class,
        Category::class => CategoryPolicy::class,
        User::class => UserPolicy::class,
        Order::class => OrderPolicy::class,
        Setting::class => SettingPolicy::class,
        Book::class => BookPolicy::class,
        Course::class => CoursePolicy::class,
        Size::class => SizePolicy::class,
        Color::class => ColorPolicy::class,
        Role::class => RolePolicy::class,
        Tag::class => TagPolicy::class,
        Post::class => PostPolicy::class,
        Privilege::class => PrivilegePolicy::class,
        Country::class => CountryPolicy::class,
        Area::class => AreaPolicy::class,
        Slide::class => SlidePolicy::class,
        Video::class => VideoPolicy::class,
        Page::class => PagePolicy::class,
        Comment::class => CommentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

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

        Gate::define('search', function ($user, $index) {
            return $user->role->privileges->where('name', $index)->first() && $user->role->privileges->where('name', $index)->first()->pivot->index;
        });
    }
}
