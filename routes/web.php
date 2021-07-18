<?php

use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactusController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
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


Route::get('/', [HomeController::class, 'index'])->name('frontend');
Route::get('/home', [HomeController::class, 'index'])->name('frontend.home');
Route::get('contactus', [ContactusController::class, 'index']);
Route::get('/backend', [DashboardController::class, 'index'])->name('backend.home');
Route::resource('dashboard', DashboardController::class);
Route::resource('product', ProductController::class);
Route::resource('service', ServiceController::class);
Route::resource('book', BookController::class);
Route::resource('section', SectionController::class);
Route::resource('page', PageController::class);

// General Routes
Auth::routes();
Route::get('/lang/{locale}/{component}', [HomeController::class, 'changeLang']);

