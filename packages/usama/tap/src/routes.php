<?php


Route::group(['namespace' => 'Usama\Tap\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/tap/payment', 'TapPaymentController@makePaymentApi')->name('tap.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('tap/payment', 'TapPaymentController@makePayment')->name('tap.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('tap/result', 'TapPaymentController@result')->name('tap.web.payment.result');
        Route::get('tap/error', 'TapPaymentController@error')->name('tap.web.payment.error');
    });
});




