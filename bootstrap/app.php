<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->redirectGuestsTo(function ($request) {
            if ($request->is('lgk6joswmtyvdxf*') || $request->is('admin*')) {
                return route('admin.login');
            }

            if ($request->is('user*')) {
                return route('user.login');
            }

            return route('user.login'); // Default to user login
        });

        // 注册自定义中间件别名
        $middleware->alias([
            'check.permission' => \App\Http\Middleware\CheckPermission::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
