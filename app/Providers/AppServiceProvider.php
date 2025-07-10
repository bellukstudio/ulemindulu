<?php

namespace App\Providers;

use App\Domain\Auth\LoginInterface;
use App\Domain\Order\OrderInterface;
use App\Domain\Packet\PacketInterface;
use App\Domain\Template\TemplateInterface;
use App\Insfrastructure\Auth\LoginRepositoryImpl;
use App\Insfrastructure\Order\OrderRepositoryImpl;
use App\Insfrastructure\Packet\PacketRepositoryImpl;
use App\Insfrastructure\Template\TemplateRepositoryImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(LoginInterface::class, LoginRepositoryImpl::class);
        $this->app->bind(PacketInterface::class, PacketRepositoryImpl::class);
        $this->app->bind(TemplateInterface::class, TemplateRepositoryImpl::class);
        $this->app->bind(OrderInterface::class, OrderRepositoryImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
