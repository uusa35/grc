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
//Route::resource('page', PageController::class);
//Route::get('setting', [SettingController::class, 'index']);
//Route::resource('category', CategoryController::class)->only('index', 'show');
//Route::resource('product', ProductController::class)->only('index', 'show');
//Route::resource('book', BookController::class)->only('index', 'show');
//Route::resource('faq', FaqController::class)->only('index');
//Route::resource('country', CountryController::class)->only('index','show');
//Route::resource('currency', CurrencyController::class)->only('index','show');
//Route::resource('page', PageController::class)->only('index','show');
//Route::resource('slide', SlideController::class)->only('index','show');
//Route::resource('user', UserController::class)->only('index','show');
//Route::get('search/user', [UserController::class,'search']);
//Route::get('search/product', [ProductController::class,'search']);
//Route::get('search/category', [CategoryController::class,'search']);
//Route::post('images/upload',[DashboardController::class,'uploadImages']);
//
