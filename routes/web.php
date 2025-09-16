<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');

// API 测试页面
Route::get('/api-test', function () {
    return view('api-test');
})->name('api.test');

require __DIR__.'/admin.php';
