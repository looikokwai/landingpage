<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * 处理传入的请求
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $admin = auth('admin')->user();

        if (! $admin) {
            return redirect()->route('admin.login');
        }

        // 检查是否有指定权限
        if (! $admin->hasPermissionTo($permission)) {
            abort(403, '您没有权限访问此页面');
        }

        return $next($request);
    }
}
