<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SubAdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('lgk6joswmtyvdxf')->name('admin.')->group(function () {

    Route::get('login', [LoginController::class, 'create'])->middleware('guest:admin')->name('login');
    Route::post('login', [LoginController::class, 'store'])->middleware('guest:admin');

    Route::middleware(['auth:admin'])->group(function () {
        Route::get('/', fn() => redirect()->route('admin.dashboard'))->name('index');
        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // 个人资料管理路由 - 不需要权限检查，所有登录用户都可以访问
        Route::get('profile', [AdminController::class, 'showProfile'])->name('profile.show');
        Route::put('profile/password', [AdminController::class, 'updatePassword'])->name('profile.update-password');


        // 管理员管理路由 - 使用权限检查
        Route::middleware('check.permission:admins.view')->group(function () {
            Route::get('admins', [AdminController::class, 'index'])->name('admins.index');
        });

        Route::middleware('check.permission:admins.create')->group(function () {
            Route::get('admins/create', [AdminController::class, 'create'])->name('admins.create');
            Route::post('admins', [AdminController::class, 'store'])->name('admins.store');
        });

        Route::middleware('check.permission:admins.edit')->group(function () {
            Route::get('admins/{admin}/edit', [AdminController::class, 'edit'])->name('admins.edit');
            Route::put('admins/{admin}', [AdminController::class, 'update'])->name('admins.update');
        });

        Route::middleware('check.permission:admins.delete')->group(function () {
            Route::delete('admins/{admin}', [AdminController::class, 'destroy'])->name('admins.destroy');
        });


        // 子管理员管理路由 - 使用权限检查
        Route::middleware('check.permission:subadmins.view')->group(function () {
            Route::get('sub-admins', [SubAdminController::class, 'index'])->name('sub-admins.index');
        });

        Route::middleware('check.permission:subadmins.create')->group(function () {
            Route::get('sub-admins/create', [SubAdminController::class, 'create'])->name('sub-admins.create');
            Route::post('sub-admins', [SubAdminController::class, 'store'])->name('sub-admins.store');
        });

        Route::middleware('check.permission:subadmins.edit')->group(function () {
            Route::get('sub-admins/{subAdmin}/edit', [SubAdminController::class, 'edit'])->name('sub-admins.edit');
            Route::put('sub-admins/{subAdmin}', [SubAdminController::class, 'update'])->name('sub-admins.update');
        });

        Route::middleware('check.permission:subadmins.delete')->group(function () {
            Route::delete('sub-admins/{subAdmin}', [SubAdminController::class, 'destroy'])->name('sub-admins.destroy');
        });

        // 权限管理路由
        Route::middleware('check.permission:permissions.view')->group(function () {
            Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
        });

        Route::middleware('check.permission:permissions.create')->group(function () {
            Route::get('permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
            Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store');
        });

        Route::middleware('check.permission:permissions.edit')->group(function () {
            Route::get('permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
            Route::put('permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
        });

        Route::middleware('check.permission:permissions.delete')->group(function () {
            Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
        });

        // 角色管理路由
        Route::middleware('check.permission:roles.view')->group(function () {
            Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
        });

        Route::middleware('check.permission:roles.create')->group(function () {
            Route::get('roles/create', [RoleController::class, 'create'])->name('roles.create');
            Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
        });

        Route::middleware('check.permission:roles.edit')->group(function () {
            Route::get('roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
            Route::put('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        });

        Route::middleware('check.permission:roles.delete')->group(function () {
            Route::delete('roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
        });

        // Marquee Texts 管理路由
        Route::middleware('check.permission:marquee_texts.view')->group(function () {
            Route::get('marquee-texts', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'index'])->name('marquee-texts.index');
        });

        Route::middleware('check.permission:marquee_texts.create')->group(function () {
            Route::get('marquee-texts/create', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'create'])->name('marquee-texts.create');
            Route::post('marquee-texts', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'store'])->name('marquee-texts.store');
        });

        Route::middleware('check.permission:marquee_texts.edit')->group(function () {
            Route::get('marquee-texts/{marqueeText}/edit', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'edit'])->name('marquee-texts.edit');
            Route::put('marquee-texts/{marqueeText}', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'update'])->name('marquee-texts.update');
        });

        Route::middleware('check.permission:marquee_texts.delete')->group(function () {
            Route::delete('marquee-texts/{marqueeText}', [\App\Http\Controllers\Admin\MarqueeTextController::class, 'destroy'])->name('marquee-texts.destroy');
        });

        // Banner Images 管理路由
        Route::middleware('check.permission:banner_images.view')->group(function () {
            Route::get('banner-images', [\App\Http\Controllers\Admin\BannerImageController::class, 'index'])->name('banner-images.index');
        });

        Route::middleware('check.permission:banner_images.create')->group(function () {
            Route::get('banner-images/create', [\App\Http\Controllers\Admin\BannerImageController::class, 'create'])->name('banner-images.create');
            Route::post('banner-images', [\App\Http\Controllers\Admin\BannerImageController::class, 'store'])->name('banner-images.store');
        });

        Route::middleware('check.permission:banner_images.edit')->group(function () {
            Route::get('banner-images/{bannerImage}/edit', [\App\Http\Controllers\Admin\BannerImageController::class, 'edit'])->name('banner-images.edit');
            Route::put('banner-images/{bannerImage}', [\App\Http\Controllers\Admin\BannerImageController::class, 'update'])->name('banner-images.update');
        });

        Route::middleware('check.permission:banner_images.delete')->group(function () {
            Route::delete('banner-images/{bannerImage}', [\App\Http\Controllers\Admin\BannerImageController::class, 'destroy'])->name('banner-images.destroy');
        });

        // Winners Leaderboard 管理路由
        Route::middleware('check.permission:winners_leaderboard.view')->group(function () {
            Route::get('winners-leaderboard', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'index'])->name('winners-leaderboard.index');
        });

        Route::middleware('check.permission:winners_leaderboard.create')->group(function () {
            Route::get('winners-leaderboard/create', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'create'])->name('winners-leaderboard.create');
            Route::post('winners-leaderboard', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'store'])->name('winners-leaderboard.store');
        });

        Route::middleware('check.permission:winners_leaderboard.edit')->group(function () {
            Route::get('winners-leaderboard/{winnersLeaderboard}/edit', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'edit'])->name('winners-leaderboard.edit');
            Route::put('winners-leaderboard/{winnersLeaderboard}', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'update'])->name('winners-leaderboard.update');
        });

        Route::middleware('check.permission:winners_leaderboard.delete')->group(function () {
            Route::delete('winners-leaderboard/{winnersLeaderboard}', [\App\Http\Controllers\Admin\WinnersLeaderboardController::class, 'destroy'])->name('winners-leaderboard.destroy');
        });

        // Game Sections 管理路由
        Route::middleware('check.permission:game_sections.view')->group(function () {
            Route::get('game-sections', [\App\Http\Controllers\Admin\GameSectionController::class, 'index'])->name('game-sections.index');
        });

        Route::middleware('check.permission:game_sections.create')->group(function () {
            Route::get('game-sections/create', [\App\Http\Controllers\Admin\GameSectionController::class, 'create'])->name('game-sections.create');
            Route::post('game-sections', [\App\Http\Controllers\Admin\GameSectionController::class, 'store'])->name('game-sections.store');
        });

        Route::middleware('check.permission:game_sections.edit')->group(function () {
            Route::get('game-sections/{gameSection}/edit', [\App\Http\Controllers\Admin\GameSectionController::class, 'edit'])->name('game-sections.edit');
            Route::put('game-sections/{gameSection}', [\App\Http\Controllers\Admin\GameSectionController::class, 'update'])->name('game-sections.update');
        });

        Route::middleware('check.permission:game_sections.delete')->group(function () {
            Route::delete('game-sections/{gameSection}', [\App\Http\Controllers\Admin\GameSectionController::class, 'destroy'])->name('game-sections.destroy');
        });
    });
});
