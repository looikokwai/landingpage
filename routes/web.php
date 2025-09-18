<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

// API 测试页面
Route::get('/api-test', function () {
    return view('api-test');
})->name('api.test');

require __DIR__.'/admin.php';
