<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TripController;
use App\Http\Controllers\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('getAllLocations', [LocationController::class, 'getAllLocations']);

Route::get('ticketSearch', [TripController::class, 'ticketSearch']);

Route::get('seatSearch/{id}', [TripController::class, 'seatSearch']);

Route::post('seatBooking/{id}', [TripController::class, 'seatBooking']);
