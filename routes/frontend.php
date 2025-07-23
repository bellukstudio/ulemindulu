<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->group(function () {
    Route::get('/{any?}', function () {
        return view('frontend');
    })->where('any',  '^(?!api).*$')->name('frontend');
});
