<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 创建权限
        $permissions = [
            // 用户管理权限
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // 管理员管理权限
            'admins.view',
            'admins.create',
            'admins.edit',
            'admins.delete',

            // 子管理员管理权限
            'subadmins.view',
            'subadmins.create',
            'subadmins.edit',
            'subadmins.delete',

            // 权限管理权限
            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',

            // 角色管理权限
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            // Marquee Texts 管理权限
            'marquee_texts.view',
            'marquee_texts.create',
            'marquee_texts.edit',
            'marquee_texts.delete',

            // Banner Images 管理权限
            'banner_images.view',
            'banner_images.create',
            'banner_images.edit',
            'banner_images.delete',

            // Winners Leaderboard 管理权限
            'winners_leaderboard.view',
            'winners_leaderboard.create',
            'winners_leaderboard.edit',
            'winners_leaderboard.delete',

            // Game Sections 管理权限
            'game_sections.view',
            'game_sections.create',
            'game_sections.edit',
            'game_sections.delete',

        ];

        // 批量创建权限
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'admin',
            ]);
        }

        // 创建角色
        $dev = Role::firstOrCreate([
            'name' => 'dev',
            'guard_name' => 'admin',
        ]);

        $superadmin = Role::firstOrCreate([
            'name' => 'superadmin',
            'guard_name' => 'admin',
        ]);

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'admin',
        ]);

        $subadmin = Role::firstOrCreate([
            'name' => 'subadmin',
            'guard_name' => 'admin',
        ]);

        // 为 dev 分配所有权限
        $dev->syncPermissions(Permission::all());

        // 为 superadmin 分配所有权限
        $superadmin->syncPermissions(Permission::all());

        // 为 admin 分配基础权限
        $admin->syncPermissions([
            'users.view',
            'users.create',
            'users.edit',
            'subadmins.view',
            'subadmins.create',
            'subadmins.edit',
            'permissions.view',
            'roles.view',
            'marquee_texts.view',
            'marquee_texts.create',
            'marquee_texts.edit',
            'marquee_texts.delete',
            'banner_images.view',
            'banner_images.create',
            'banner_images.edit',
            'banner_images.delete',
            'winners_leaderboard.view',
            'winners_leaderboard.create',
            'winners_leaderboard.edit',
            'winners_leaderboard.delete',
            'game_sections.view',
            'game_sections.create',
            'game_sections.edit',
            'game_sections.delete',
        ]);

        // 为 subadmin 分配有限权限
        $subadmin->syncPermissions([
            'users.view',
        ]);

        $this->command->info('Permissions and roles created successfully.');
    }
}
