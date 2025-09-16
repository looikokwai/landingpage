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

            // 任务管理权限
            'tasks.view',
            'tasks.create',
            'tasks.edit',
            'tasks.delete',

            // 特殊任务管理权限
            'special_tasks.view',
            'special_tasks.create',
            'special_tasks.edit',
            'special_tasks.delete',
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
            'tasks.view',
            'tasks.create',
            'tasks.edit',
            'tasks.delete',
            'special_tasks.view',
            'special_tasks.create',
            'special_tasks.edit',
            'special_tasks.delete',
        ]);

        // 为 subadmin 分配有限权限
        $subadmin->syncPermissions([
            'users.view',
            'tasks.view',
            'special_tasks.view',
        ]);

        $this->command->info('Permissions and roles created successfully.');
    }
}
