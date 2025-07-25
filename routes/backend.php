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

            Route::prefix('dashboard')->group(function () {
                ///
                // Route::get('/packets', App\Livewire\Admin\Packet\Index::class)->name('packets.index');
                // Route::get('/packets/create', App\Livewire\Admin\Packet\Create::class)->name('packets.create');
                // Route::get('/packets/{packet}/edit', App\Livewire\Admin\Packet\Edit::class)->name('packets.edit');

                Route::get('/templates', App\Livewire\Admin\Template\Index::class)->name('templates.index');
                Route::get('/templates/create', App\Livewire\Admin\Template\Create::class)->name('templates.create');
                Route::get('/templates/{template}/edit', App\Livewire\Admin\Template\Edit::class)->name('templates.edit');

                Route::get('/orders', App\Livewire\Admin\Order\Index::class)->name('orders.index');

                Route::get('/clients', App\Livewire\Admin\Client\Index::class)->name('clients.index');
            });
            Route::post('/logout', function () {
                Auth::logout();
                session()->invalidate();
                session()->regenerateToken();
                return redirect()->route('login');
            })->name('logout');
        });
    });
});
