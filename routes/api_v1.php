<?php

use App\Http\Controllers\Api\V1\TemplateController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::get('/template/all', [TemplateController::class, 'all']);

    Route::post('/auth/login', [App\Http\Controllers\Api\V1\LoginController::class, 'login']);
    Route::post('/auth/register', [App\Http\Controllers\Api\V1\RegisterController::class, 'register']);


    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/auth/logout', [App\Http\Controllers\Api\V1\LoginController::class, 'logout']);

        // Route ORDER
        Route::post('/order/order-template', [App\Http\Controllers\Api\V1\OrderController::class, 'createOrder']);

        // Route TEMPLATE
        Route::get('/templates/me/invitation', [App\Http\Controllers\Api\V1\OrderController::class, 'getAllTemplateOrder']);
    });
});
