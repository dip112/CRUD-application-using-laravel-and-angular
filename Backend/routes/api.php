<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/view/{id}',[App\Http\Controllers\EmployeeController::class, 'view']);
Route::delete('/delete/{id}', [App\Http\Controllers\EmployeeController::class, 'delete']);
Route::put('/update/{id}', [App\Http\Controllers\EmployeeController::class, 'update']);
Route::post('/register', [App\Http\Controllers\EmployeeController::class, 'store']);
Route::get('/employees', [App\Http\Controllers\EmployeeController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
