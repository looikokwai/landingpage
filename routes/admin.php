<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SubAdminController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\SpecialTaskController;
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

        // 任务管理路由
        Route::middleware('check.permission:tasks.view')->group(function () {
            Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');
        });

        Route::middleware('check.permission:tasks.create')->group(function () {
            Route::get('tasks/create', [TaskController::class, 'create'])->name('tasks.create');
            Route::post('tasks', [TaskController::class, 'store'])->name('tasks.store');
        });

        Route::middleware('check.permission:tasks.edit')->group(function () {
            Route::get('tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
            Route::put('tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
        });

        Route::middleware('check.permission:tasks.delete')->group(function () {
            Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
        });

        // 特殊任务管理路由
        Route::middleware('check.permission:special_tasks.view')->group(function () {
            Route::get('special-tasks', [SpecialTaskController::class, 'index'])->name('special-tasks.index');
        });

        Route::middleware('check.permission:special_tasks.create')->group(function () {
            Route::get('special-tasks/create', [SpecialTaskController::class, 'create'])->name('special-tasks.create');
            Route::post('special-tasks', [SpecialTaskController::class, 'store'])->name('special-tasks.store');
        });

        Route::middleware('check.permission:special_tasks.edit')->group(function () {
            Route::get('special-tasks/{task}/edit', [SpecialTaskController::class, 'edit'])->name('special-tasks.edit');
            Route::put('special-tasks/{task}', [SpecialTaskController::class, 'update'])->name('special-tasks.update');
        });

        Route::middleware('check.permission:special_tasks.delete')->group(function () {
            Route::delete('special-tasks/{task}', [SpecialTaskController::class, 'destroy'])->name('special-tasks.destroy');
        });

    });
});
