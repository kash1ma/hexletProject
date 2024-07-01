<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Test');
});

Route::resource('users', UserController::class);
Route::post('users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
Route::delete('users/{id}/force-delete', [UserController::class, 'forceDelete'])->name('users.forceDelete');
Route::post('users/{id}/ban', [UserController::class, 'ban'])->name('users.ban');
Route::post('users/{id}/unban', [UserController::class, 'unban'])->name('users.unban');
