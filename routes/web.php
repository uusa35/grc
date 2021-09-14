<?php

use App\Http\Controllers\Backend\AddressController;
use App\Http\Controllers\Backend\AreaController;
use App\Http\Controllers\Backend\BranchController;
use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\ColorController;
use App\Http\Controllers\Backend\CommercialController;
use App\Http\Controllers\Backend\CountryController;
use App\Http\Controllers\Backend\CouponController;
use App\Http\Controllers\Backend\CurrencyController;
use App\Http\Controllers\Backend\DayController;
use App\Http\Controllers\Backend\DeviceController;
use App\Http\Controllers\Backend\FaqController;
use App\Http\Controllers\Backend\GalleryController;
use App\Http\Controllers\Backend\ImageController;
use App\Http\Controllers\Backend\NewsletterController;
use App\Http\Controllers\Backend\NotificationController;
use App\Http\Controllers\Backend\PostController;
use App\Http\Controllers\Backend\PrivilegeController;
use App\Http\Controllers\Backend\ProductAttributeController;
use App\Http\Controllers\Backend\RoleController;
use App\Http\Controllers\Backend\ShipmentController;
use App\Http\Controllers\Backend\SizeController;
use App\Http\Controllers\Backend\SlideController;
use App\Http\Controllers\Backend\BookController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\CourseController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\OrderController;
use App\Http\Controllers\Backend\PageController;
use App\Http\Controllers\Backend\SectionController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\ServiceController;
use App\Http\Controllers\Backend\SettingController;
use App\Http\Controllers\Backend\SubscriptionController;
use App\Http\Controllers\Backend\TagController;
use App\Http\Controllers\Backend\TimingController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\Backend\VideoController;
use App\Http\Controllers\Frontend\FrontendBookController;
use App\Http\Controllers\Frontend\FrontendCartController;
use App\Http\Controllers\Frontend\FrontendCategoryController;
use App\Http\Controllers\Frontend\FrontendCourseController;
use App\Http\Controllers\Frontend\FrontendFaqController;
use App\Http\Controllers\Frontend\FrontendFavoriteController;
use App\Http\Controllers\Frontend\FrontendOrderController;
use App\Http\Controllers\Frontend\FrontendPageController;
use App\Http\Controllers\Frontend\FrontendProductController;
use App\Http\Controllers\Frontend\FrontendRatingController;
use App\Http\Controllers\Frontend\FrontendServiceController;
use App\Http\Controllers\Frontend\FrontendUserController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\GovernateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();
Route::group(['as' => 'frontend.', 'middleware' => ['frontendInertiaHandler']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/home', [HomeController::class, 'index'])->name('index');
    Route::get('/home', [HomeController::class, 'index'])->name('home.index');
    Route::get('/lang/{lang}', [HomeController::class, 'changeLang'])->name('change.lang');
    Route::resource('product', FrontendProductController::class)->only(['index', 'show']);
    Route::resource('book', FrontendBookController::class)->only(['index', 'show']);
    Route::resource('service', FrontendServiceController::class)->only(['index', 'show']);
    Route::resource('course', FrontendCourseController::class)->only(['index', 'show']);
    Route::resource('category', FrontendCategoryController::class);
    Route::resource('user', FrontendUserController::class)->except('destroy','edit');
    Route::resource('faq', FrontendFaqController::class)->only('index');
    Route::get('contactus', [FrontendPageController::class, 'getContactus'])->name('contactus');
    Route::get('aboutus', [FrontendPageController::class, 'getAboutus'])->name('aboutus');
    Route::get('polices', [FrontendPageController::class, 'getPolicies'])->name('polices');
    Route::get('terms', [FrontendPageController::class, 'getTerms'])->name('terms');
    Route::get('faqs', [FrontendPageController::class, 'getFaqs'])->name('faqs');
    Route::get('subscriptions', [FrontendPageController::class, 'getSubscriptions'])->name('subscriptions');
    Route::get('cart', [FrontendCartController::class, 'index'])->name('cart.index');
    Route::group(['middleware' => 'auth'], function () {
        Route::resource('rating', FrontendRatingController::class)->only('store');
        Route::resource('favorite', FrontendFavoriteController::class)->only('store');
        Route::resource('user', FrontendUserController::class)->only('edit');
        Route::resource('order', FrontendOrderController::class)->only(['index','show']);
        // temp routes for testing only
        Route::get('order/{id}/paid', [FrontendOrderController::class, 'makeOrderPaid'])->name('order.paid');
        Route::get('order/{id}/failed', [FrontendOrderController::class, 'makeOrderFailed'])->name('order.failed');
        Route::get('order/paid/{id}/event', [FrontendOrderController::class, 'makeNotify'])->name('order.notify');
        Route::get('profile/reset/password', [FrontendUserController::class,'getResetPassword'])->name('user.reset');
        Route::post('profile/reset/password', [FrontendUserController::class,'postResetPassword'])->name('user.post.reset');
        Route::get('profile/book', [FrontendUserController::class,'getBooks'])->name('user.book');
        Route::get('profile/course', [FrontendUserController::class,'getCourses'])->name('user.course');
        Route::get('profile/service', [FrontendUserController::class,'getServices'])->name('user.service');
    });
});

Route::group(['prefix' => 'backend', 'as' => 'backend.', 'middleware' => ['auth', 'dashboard','backendInertiaHandler']], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/home', [DashboardController::class, 'index'])->name('home.index');
    Route::get('/lang/{lang}', [HomeController::class, 'changeLang'])->name('change.lang');
    Route::get('product/search', [ProductController::class, 'search'])->name('product.search');
    Route::get('service/search', [ServiceController::class, 'search'])->name('service.search');
    Route::get('user/search', [UserController::class, 'search'])->name('user.search');
    Route::get('book/search', [BookController::class, 'search'])->name('book.search');
    Route::get('category/search', [CategoryController::class, 'search'])->name('category.search');
    Route::get('order/search', [OrderController::class, 'search'])->name('order.search');
    Route::get('course/search', [CourseController::class, 'search'])->name('course.search');
    Route::get('slide/search', [SlideController::class, 'search'])->name('slide.search');
    Route::resource('dashboard', DashboardController::class)->only(['index']);
    Route::resource('service', ServiceController::class);
    Route::resource('timing', TimingController::class);
    Route::resource('book', BookController::class);
    Route::resource('section', SectionController::class);
    Route::resource('page', PageController::class);
    Route::resource('user', UserController::class);
    Route::resource('order', OrderController::class);
    Route::resource('course', CourseController::class);
    Route::resource('slide', SlideController::class);
    Route::resource('image', ImageController::class)->only('destroy');
    Route::get('clear/element', [DashboardController::class, 'clearElement'])->name('element.clear');
    Route::resource('product', ProductController::class);
    Route::resource('coupon', CouponController::class);
    Route::resource('attribute', ProductAttributeController::class);
    Route::resource('commercial', CommercialController::class);
    Route::resource('branch', BranchController::class);
    Route::resource('address', AddressController::class);
//  super
    Route::group(['middleware' => 'super'], function () {
        Route::resource('role', RoleController::class);
        Route::resource('privilege', PrivilegeController::class);
    });
// admins
    Route::group(['middleware' => 'admin'], function () {
        Route::get('toggle/activate', [DashboardController::class, 'toggleActivate'])->name('toggle.activate');
        Route::get('trashed', [DashboardController::class, 'trashed'])->name('trashed');
        Route::get('restore', [DashboardController::class, 'restore'])->name('restore');
        Route::resource('color', ColorController::class);
        Route::resource('size', SizeController::class);
        Route::resource('country', CountryController::class);
        Route::resource('governate', GovernateController::class);
        Route::resource('area', AreaController::class);
        Route::resource('currency', CurrencyController::class);
        Route::resource('brand', BrandController::class);
        Route::resource('tag', TagController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('video', VideoController::class);
        Route::resource('image', ImageController::class);
        Route::resource('gallery', GalleryController::class); // images table
        Route::resource('post', PostController::class);
        Route::resource('newsletter', NewsletterController::class);
        Route::resource('device', DeviceController::class);
        Route::resource('setting', SettingController::class);
        Route::resource('notification', NotificationController::class);
        Route::resource('shipment', ShipmentController::class);
        Route::resource('faq', FaqController::class);
        Route::resource('subscription', SubscriptionController::class);
        // order status switch
        Route::get('order/switch/status', [OrderController::class, 'switchStatus'])->name('order.switch');
    });
});
