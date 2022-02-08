<?php

//use App\Http\Controllers\Api\BookController;
//use App\Http\Controllers\Api\CategoryController;
//use App\Http\Controllers\Api\CountryController;
//use App\Http\Controllers\Api\CurrencyController;
//use App\Http\Controllers\Api\FaqController;
//use App\Http\Controllers\Api\SettingController;
//use App\Http\Controllers\Api\PageController;
//use App\Http\Controllers\Api\ProductController;
//use App\Http\Controllers\Api\SlideController;
//use App\Http\Controllers\Api\UserController;
//use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\TranslationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'auth:api'], function () {
//    Route::resource('setting', SettingController::class)->except('index');
});
Route::resource('product', ProductController::class)->only('index', 'show');
Route::resource('book', BookController::class)->only('index', 'show');
Route::resource('course', CourseController::class)->only(['index','show']);
Route::resource('service', ServiceController::class)->only(['index','show']);
Route::resource('user', UserController::class)->only('index','show');
Route::get('setting', [SettingController::class, 'index']);
Route::resource('slide', SlideController::class)->only('index','show');
Route::resource('category', CategoryController::class)->only('index', 'show');
Route::resource('faq', FaqController::class)->only('index');
Route::resource('country', CountryController::class)->only('index','show');
Route::resource('currency', CurrencyController::class)->only('index','show');
//Route::resource('page', PageController::class)->only('index','show');
Route::get('search/user', [UserController::class,'search']);
Route::get('search/product', [ProductController::class,'search']);
Route::get('search/service', [ServiceController::class,'search']);
Route::get('search/course', [CourseController::class,'search']);
Route::get('search/book', [BookController::class,'search']);
Route::get('search/category', [CategoryController::class,'search']);
Route::get('search/slide', [SlideController::class,'search']);
Route::post('images/upload',[DashboardController::class,'uploadImages']);
Route::get('translations', [TranslationController::class, 'getTranslations'])->name('translation.index');
