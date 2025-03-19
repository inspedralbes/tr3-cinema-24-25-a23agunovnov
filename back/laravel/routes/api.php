<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionMovieController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClienteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ==== AUTH ===================
Route::prefix('/auth')->group(function () {
    Route::post('/register-admin', [AdminController::class, 'store']);
    Route::post('/login-admin', [AdminController::class, 'login']);
    Route::post('/register', [ClienteController::class, 'store']);
    Route::post('/login', [ClienteController::class, 'login']);
    // Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    // Route::middleware('auth:sanctum')->post('change-password', [AuthController::class, 'changePassword']);
});

Route::apiResource('/session', SessionMovieController::class);

Route::apiResource('/ticket', TicketController::class)->middleware('auth:sanctum');
Route::get('/getAllTickets', [TicketController::class, 'getAll'])->middleware('auth:sanctum');

Route::get('/test', function () {
    return 'Hello, API!';
});