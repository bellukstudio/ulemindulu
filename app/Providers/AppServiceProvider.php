<?php

namespace App\Providers;

use App\Domain\Auth\AuthInterface;
use App\Domain\Client\ClientInterface;
use App\Domain\Gift\GiftInterface;
use App\Domain\Invitation\InvitationInterface;
use App\Domain\Invoice\InvoiceInterface;
use App\Domain\Order\OrderInterface;
use App\Domain\Packet\PacketInterface;
use App\Domain\Template\TemplateInterface;
use App\Domain\Wishes\WishesInterface;
use App\Insfrastructure\Auth\LoginRepositoryImpl;
use App\Insfrastructure\Client\ClientRepositoryImpl;
use App\Insfrastructure\Gift\GiftRepositoryImpl;
use App\Insfrastructure\Invitation\InvitationRepositoryImpl;
use App\Insfrastructure\Invoice\InvoieRepositoryImpl;
use App\Insfrastructure\Order\OrderRepositoryImpl;
use App\Insfrastructure\Packet\PacketRepositoryImpl;
use App\Insfrastructure\Template\TemplateRepositoryImpl;
use App\Insfrastructure\Wishes\WishesRepositoryImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {


        $this->app->bind(AuthInterface::class, LoginRepositoryImpl::class);
        $this->app->bind(PacketInterface::class, PacketRepositoryImpl::class);
        $this->app->bind(TemplateInterface::class, TemplateRepositoryImpl::class);
        $this->app->bind(OrderInterface::class, OrderRepositoryImpl::class);
        $this->app->bind(InvitationInterface::class, InvitationRepositoryImpl::class);
        $this->app->bind(GiftInterface::class, GiftRepositoryImpl::class);
        $this->app->bind(WishesInterface::class, WishesRepositoryImpl::class);
        $this->app->bind(ClientInterface::class, ClientRepositoryImpl::class);
        $this->app->bind(InvoiceInterface::class, InvoieRepositoryImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
