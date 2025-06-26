<?php

use App\Livewire\Admin\Dashboard;
use Illuminate\Support\Facades\Route;
use App\Livewire\Admin\Login;
use Illuminate\Support\Facades\Auth;

Route::middleware(['web'])->group(function () {

    Route::prefix('ulemindulu/admin')->group(function () {
        Route::get('/login', Login::class)->name('login');


        Route::middleware(['auth'])->group(function () {
            Route::get('/dashboard', Dashboard::class)->name('dashboard');
            Route::post('/logout', function () {
                Auth::logout();
                session()->invalidate();
                session()->regenerateToken();
                return redirect()->route('login');
            })->name('logout');
        });
    });
});
