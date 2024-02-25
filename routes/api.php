<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ShugoExpressController;


Route::middleware('auth:sanctum')->group(function () {

    // info about current user
    Route::get('/user', [UserController::class, 'getUser']);

    Route::get('/shugoproduct', [ShugoExpressController::class, 'getProduct']);
    Route::post('/productPurchase', [ShugoExpressController::class, 'productPurchase']);

    Route::post('/updatePassword', [UserController::class, 'updatePassword']);
    Route::post('/updateEmail', [UserController::class, 'updateEmail']);
    Route::post('/repairPerson', [UserController::class, 'repairPerson']);


    Route::post('/logout', [AuthController::class, 'logout']);
    
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
