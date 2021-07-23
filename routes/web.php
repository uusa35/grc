<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactusController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
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


//    session()->put(['locale' => ])
Route::get('/', [HomeController::class, 'index'])->name('frontend');
Route::get('/home', [HomeController::class, 'index'])->name('frontend.home');
Route::get('contactus', [ContactusController::class, 'index']);
Route::group(['prefix' => 'backend', 'as' => 'backend.', 'middleware' => 'auth'], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('product/search', [ProductController::class, 'search'])->name('product.search');
    Route::get('service/search', [ServiceController::class, 'search'])->name('service.search');
    Route::get('user/search', [UserController::class, 'search'])->name('user.search');
    Route::get('book/search', [BookController::class, 'search'])->name('book.search');
    Route::get('category/search', [CategoryController::class, 'search'])->name('category.search');
    Route::get('{module}/toggle/activate', [DashboardController::class, 'toggleActivate'])->name('toggle.activate');
    Route::resource('dashboard', DashboardController::class);
    Route::resource('product', ProductController::class);
    Route::resource('service', ServiceController::class);
    Route::resource('book', BookController::class);
    Route::resource('section', SectionController::class);
    Route::resource('page', PageController::class);
    Route::resource('user', UserController::class);
});
// General Routes
Auth::routes();
Route::get('/lang/{locale}', [HomeController::class, 'changeLang']);


