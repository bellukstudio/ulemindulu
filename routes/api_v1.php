<?php

use App\Http\Controllers\Api\V1\TemplateController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {

    Route::prefix('general')->group(function () {
        Route::post('/auth/login', [App\Http\Controllers\Api\V1\LoginController::class, 'login']);
        Route::post('/auth/register', [App\Http\Controllers\Api\V1\RegisterController::class, 'register']);

        Route::get('/template/all', [TemplateController::class, 'all']);
        Route::get('/template/{id}', [TemplateController::class, 'show']);

        Route::get('/invitation/{slug}', [App\Http\Controllers\Api\V1\InvitationController::class, 'getBySlug']);

        ///
        // Route::get('/gift/{orderId}/invitation/{invitationTemplateId}', [App\Http\Controllers\Api\V1\GiftController::class, 'getAccountBank']);
        Route::get('/wishes/{slug}', [App\Http\Controllers\Api\V1\WishesController::class, 'getAllWishes']);
        Route::post('/wishes/{slug}/create', [App\Http\Controllers\Api\V1\WishesController::class, 'postWishes']);
    });



    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/auth/logout', [App\Http\Controllers\Api\V1\LoginController::class, 'logout']);

        // Route ORDER
        Route::prefix('order')->group(function () {
            Route::post('/order-template', [App\Http\Controllers\Api\V1\OrderController::class, 'createOrder']);
        });

        // Route TEMPLATE
        Route::prefix('me')->group(function () {
            Route::get('/templates/invitation', [App\Http\Controllers\Api\V1\OrderController::class, 'getAllTemplateOrder']);
            Route::get('/order/{id}', [App\Http\Controllers\Api\V1\OrderController::class, 'show']);
        });

        // Route Invitation Settings
        Route::prefix('settings')->group(function () {
            Route::post('/invitationSettings/create', [App\Http\Controllers\Api\V1\InvitationController::class, 'createInvitation']);
            Route::put('/invitationSettings/{id}/update', [App\Http\Controllers\Api\V1\InvitationController::class, 'updateInvitationSettings']);
            Route::get('/invitationSettings/{id}/check', [App\Http\Controllers\Api\V1\InvitationController::class, 'checkSettings']);
        });


        Route::prefix('gift')->group(function () {
            Route::post('/bank-account/create', [App\Http\Controllers\Api\V1\GiftController::class, 'createBankApiAccounts']);
            Route::get('/bank-account/{order_id}/{invitation_template_id}', [App\Http\Controllers\Api\V1\GiftController::class, 'checkBankAccount']);
            Route::post('/bank-account/update', [App\Http\Controllers\Api\V1\GiftController::class, 'updateBankApiAccount']);
            Route::delete('/bank-account/{bankAccountId}', [App\Http\Controllers\Api\V1\GiftController::class, 'deleteBankApiAccount']);
        });

        Route::prefix('album')->group(function () {
            Route::post('/upload', [App\Http\Controllers\Api\V1\AlbumController::class, 'upload']);
            Route::delete('/photo/{id}', [App\Http\Controllers\Api\V1\AlbumController::class, 'destroy']);
            Route::put('/reorder', [App\Http\Controllers\Api\V1\AlbumController::class, 'reorderUpsert']);
            Route::get('/myalbum/{orderId}', [App\Http\Controllers\Api\V1\AlbumController::class, 'getMyAlbum']);
        });
    });
});
