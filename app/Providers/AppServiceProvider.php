<?php

namespace App\Providers;

use App\Services\MenuService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'menu' => function () {
                if (Auth::guard('admin')->check()) {
                    $menuService = app(MenuService::class);
                    $admin = Auth::guard('admin')->user();
                    if ($admin) {
                        \assert($admin instanceof \App\Models\Admin);
                        return $menuService->generateAdminMenu($admin);
                    }
                }
                return [];
            },
        ]);
    }
}
