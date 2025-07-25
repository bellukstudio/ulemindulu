<?php

namespace App\Injection;

use Illuminate\Contracts\Foundation\Application;

class AppInjection
{
    public static function register(Application $app): void
    {
        $app->bind(\App\Domain\Auth\AuthInterface::class, \App\Insfrastructure\Auth\LoginRepositoryImpl::class);
        $app->bind(\App\Domain\Packet\PacketInterface::class, \App\Insfrastructure\Packet\PacketRepositoryImpl::class);
        $app->bind(\App\Domain\Template\TemplateInterface::class, \App\Insfrastructure\Template\TemplateRepositoryImpl::class);
        $app->bind(\App\Domain\Order\OrderInterface::class, \App\Insfrastructure\Order\OrderRepositoryImpl::class);
        $app->bind(\App\Domain\Invitation\InvitationInterface::class, \App\Insfrastructure\Invitation\InvitationRepositoryImpl::class);
        $app->bind(\App\Domain\Gift\GiftInterface::class, \App\Insfrastructure\Gift\GiftRepositoryImpl::class);
        $app->bind(\App\Domain\Wishes\WishesInterface::class, \App\Insfrastructure\Wishes\WishesRepositoryImpl::class);
        $app->bind(\App\Domain\Client\ClientInterface::class, \App\Insfrastructure\Client\ClientRepositoryImpl::class);
        $app->bind(\App\Domain\Invoice\InvoiceInterface::class, \App\Insfrastructure\Invoice\InvoiceRepositoryImpl::class);
        $app->bind(\App\Domain\Album\AlbumInterface::class, \App\Insfrastructure\Album\AlbumRepositoryImpl::class);
        $app->bind(\App\Domain\Payment\PaymentInterface::class, \App\Insfrastructure\Payment\PaymentRepositoryImpl::class);
    }
}
