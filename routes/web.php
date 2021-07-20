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
Route::get('/backend', [DashboardController::class, 'index'])->name('backend.home');
Route::resource('dashboard', DashboardController::class);
Route::resource('backend/product', ProductController::class);
Route::resource('service', ServiceController::class);
Route::resource('book', BookController::class);
Route::resource('section', SectionController::class);
Route::resource('page', PageController::class);
Route::resource('user', UserController::class);
Route::get('backend/search/product', [ProductController::class, 'search'])->name('search.product');
Route::get('backend/search/service', [ServiceController::class, 'search'])->name('search.service');
Route::get('backend/search/user', [UserController::class, 'search'])->name('search.user');
Route::get('backend/search/book', [BookController::class, 'search'])->name('search.book');
Route::get('backend/search/category', [CategoryController::class, 'search'])->name('search.category');

// General Routes
Auth::routes();
Route::get('/lang/{locale}', [HomeController::class, 'changeLang']);


