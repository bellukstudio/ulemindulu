<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Injection\AppInjection;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        AppInjection::register($this->app);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
