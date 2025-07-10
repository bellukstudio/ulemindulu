<?php

use App\Http\Controllers\Api\V1\TemplateController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::get('/template/all', [TemplateController::class, 'all']);
});
