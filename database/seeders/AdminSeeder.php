<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 创建 dev 用户
        $dev = Admin::firstOrCreate(
            ['email' => 'dev@example.com'],
            [
                'name' => 'Developer',
                'username' => 'Dev',
                'password' => Hash::make('password'),
            ]
        );
        $dev->assignRole('dev');

        // 创建 superadmin 用户
        $superadmin = Admin::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'password' => Hash::make('password'),
            ]
        );
        $superadmin->assignRole('superadmin');

        // 创建 admin 用户
        $adminUser = Admin::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'username' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );
        $adminUser->assignRole('admin');

        // 创建 subadmin 用户
        $subAdmin = Admin::firstOrCreate(
            ['email' => 'subadmin@example.com'],
            [
                'name' => 'Sub Admin User',
                'username' => 'SubAdmin',
                'password' => Hash::make('password'),
                'parent_id' => $adminUser->id, // 假设 subadmin 属于 adminUser
            ]
        );
        $subAdmin->assignRole('subadmin');

        $this->command->info('Admin users created successfully.');
    }
}
