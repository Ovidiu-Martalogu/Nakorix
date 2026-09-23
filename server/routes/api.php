<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DeviceController;

use App\Http\Controllers\NetworkController;

use App\Http\Controllers\LogController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/devices/discover', [DeviceController::class, 'discover']);

Route::post('/devices', [DeviceController::class, 'store']);


Route::put('/devices/{id}', [DeviceController::class, 'update']);
Route::delete('/devices/{id}', [DeviceController::class, 'destroy']);

Route::get('/network', [NetworkController::class, 'index']);

Route::get('/logs', [LogController::class, 'index']);
Route::post('/logs', [LogController::class, 'store']);
