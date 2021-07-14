<?php

use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\SectionController;
use App\Models\Page;
use App\Models\Section;
use App\Models\Setting;
use Illuminate\Http\Request;
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

Route::get('/', function () {
    return inertia('HomePage');
});
Auth::routes();
Route::get('/home', function () {
    return inertia('HomePage');
});
//Route::get('/home', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/hello', function () {
    return inertia('HelloPage');
});

Route::get('/contactus', function () {
    return inertia('ContactusPage', ['settings' => Setting::first()]);
});

Route::get('/page/{id}', function ($id) {
    return inertia('PageShowScreen', ['elements' => Page::whereId($id)->with('sections')->first()]);
});

Route::resource('section', SectionController::class);
Route::resource('page', PageController::class);

