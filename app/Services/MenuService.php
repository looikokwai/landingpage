<?php

namespace App\Services;

use App\Models\Admin;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class MenuService
{
    /**
     * Generate the admin menu and cache it.
     */
    public function generateAdminMenu(Admin $admin): array
    {
        if (!$admin || !$admin->exists) {
            return [];
        }

        $cacheKey = "admin_menu_{$admin->id}";

        // When running in local dev, don't cache menu for easier development.
        if (app()->environment('local')) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, 300, function () use ($admin) {
            return $this->buildMenu($admin);
        });
    }

    /**
     * Build the menu array based on the admin's permissions.
     */
    protected function buildMenu(Admin $admin): array
    {
        $menuMap = $this->getMenuMap();
        $menu = [];

        foreach ($menuMap as $key => $item) {
            // Check permission for the parent menu item.
            // If 'permission' is not set, it's accessible to all authenticated admins.
            if (isset($item['permission']) && !$admin->hasPermissionTo($item['permission'])) {
                continue;
            }

            // If the menu item has children, filter them based on their permissions.
            if (isset($item['children'])) {
                $accessibleChildren = [];
                foreach ($item['children'] as $child) {
                    // If a child has a specific permission, check it.
                    // Otherwise, it's accessible if the parent is.
                    if (isset($child['permission']) && !$admin->hasPermissionTo($child['permission'])) {
                        continue;
                    }
                    unset($child['permission']); // Don't expose permission details to the frontend.
                    $accessibleChildren[] = $child;
                }

                // Only add the parent menu if it has at least one accessible child.
                if (!empty($accessibleChildren)) {
                    $item['children'] = $accessibleChildren;
                    $menu[$key] = $item;
                }
            } else {
                // This is a single-level menu item.
                $menu[$key] = $item;
            }
        }

        // Sort the final menu based on the 'order' key.
        uasort($menu, fn ($a, $b) => ($a['order'] ?? 999) <=> ($b['order'] ?? 999));

        return $menu;
    }

    /**
     * Defines the entire menu structure for the admin panel.
     * This is the single source of truth for navigation.
     */
    private function getMenuMap(): array
    {
        return [
            'dashboard' => [
                'name' => 'nav.dashboard',
                'icon' => 'dashboard',
                'route' => 'admin.dashboard',
                'order' => 1,
            ],
            'content_management' => [
                'name' => 'nav.content_management',
                'icon' => 'content_copy',
                'order' => 2,
                'children' => [
                    ['name' => 'nav.marquee_texts', 'route' => 'admin.marquee-texts.index', 'permission' => 'marquee_texts.view'],
                    ['name' => 'nav.banner_images', 'route' => 'admin.banner-images.index', 'permission' => 'banner_images.view'],
                    ['name' => 'nav.winners_leaderboard', 'route' => 'admin.winners-leaderboard.index', 'permission' => 'winners_leaderboard.view'],
                    ['name' => 'nav.game_sections', 'route' => 'admin.game-sections.index', 'permission' => 'game_sections.view'],
                ],
            ],
            'admin_management' => [
                'name' => 'nav.admin_management',
                'icon' => 'admin',
                'order' => 8,
                'children' => [
                    ['name' => 'nav.admins_list', 'route' => 'admin.admins.index', 'permission' => 'admins.view'],
                    ['name' => 'nav.subadmins_list', 'route' => 'admin.sub-admins.index', 'permission' => 'subadmins.view'],
                ],
            ],
            'access_control' => [
                'name' => 'nav.access_control',
                'icon' => 'shield',
                'order' => 9,
                'children' => [
                    ['name' => 'nav.permissions', 'route' => 'admin.permissions.index', 'permission' => 'permissions.view'],
                    ['name' => 'nav.roles', 'route' => 'admin.roles.index', 'permission' => 'roles.view'],
                ]
            ],
        ];
    }

    /**
     * Clear the menu cache for a specific admin.
     */
    public function clearMenuCache(Admin $admin): void
    {
        $cacheKey = "admin_menu_{$admin->id}";
        Cache::forget($cacheKey);
    }

    /**
     * Clear the menu cache for all users.
     */
    public function clearAllMenuCache(): void
    {
        // Use a more specific method if your app uses cache for other things.
        // For now, assuming flushing is okay for this purpose.
        // A better approach would be to use tags if the cache driver supports it.
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $this->clearMenuCache($admin);
        }
    }
}
