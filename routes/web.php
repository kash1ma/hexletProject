<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
Route::get('/', function () {
    return Inertia::render('Test');
});

Route::resource('users', UserController::class);