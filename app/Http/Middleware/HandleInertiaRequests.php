<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // 获取管理员用户（用于 admin 路由）
        $adminUser = $request->user('admin');

        // 获取普通用户（用于 web 路由）
        $webUser = $request->user('web');

        // 根据当前路由判断应该传递哪个用户信息
        $currentRoute = $request->route()?->getName();
        $isAdminRoute = $currentRoute && str_starts_with($currentRoute, 'admin.');
        $isUserRoute = $currentRoute && str_starts_with($currentRoute, 'user.');

        // 调试权限数据（仅针对管理员）
        $permissions = [];
        if ($adminUser && $isAdminRoute) {
            try {
                $allPermissions = $adminUser->getAllPermissions();
                $permissions = $allPermissions->pluck('name')->toArray();

            } catch (\Exception $e) {
                \Log::error('Error getting admin permissions', [
                    'user_id' => $adminUser->id,
                    'error' => $e->getMessage()
                ]);
                $permissions = [];
            }
        }

        // 根据路由类型确定当前用户
        $currentUser = null;
        if ($isAdminRoute) {
            // Admin 路由：只传递 admin 用户
            $currentUser = $adminUser;
        } elseif ($isUserRoute || !$isAdminRoute) {
            // User 路由或公共路由：只传递 web 用户
            $currentUser = $webUser;
        }

        // 准备认证数据
        $authData = [
            'user' => $currentUser ? [
                'id' => $currentUser->id,
                'name' => $currentUser->name,
                'email' => $currentUser->email,
                'role' => $isAdminRoute && $adminUser ? ($adminUser->roles->first()?->name ?? '无角色') : 'user',
            ] : null,
        ];

        $parentData = parent::share($request);

        return [
            ...$parentData,
            'auth' => $authData,
            'permissions' => $permissions,
            'app' => [
                'name' => config('app.name'),
                'url' => config('app.url'),
            ],
            'shared_seo' => config('seo'),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}


