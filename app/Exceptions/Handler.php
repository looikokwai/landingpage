<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Handle unauthenticated users.
     */
    protected function unauthenticated($request, AuthenticationException $exception): Response
    {
        // 如果是管理员路由，重定向到管理员登录页面
        if ($request->is('lgk6joswmtyvdxf*') || $request->is('admin*')) {
            return redirect()->guest(route('admin.login'));
        }

        // 如果是用户路由，重定向到用户登录页面
        if ($request->is('user*')) {
            return redirect()->guest(route('user.login'));
        }

        // 其他情况重定向到用户登录页面（默认）
        return redirect()->guest(route('user.login'));
    }
}
