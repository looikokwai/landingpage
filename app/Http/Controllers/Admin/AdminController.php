<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Admin::query();

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $admins = $query->select('id', 'name', 'username', 'email')
            ->with('roles')
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($admin) {
                return [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'username' => $admin->username,
                    'email' => $admin->email,
                    'role' => $admin->roles->first()?->name ?? '无角色',
                ];
            });

        return Inertia::render('Admin/Admins/Index', [
            'admins' => $admins,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::where('guard_name', 'admin')->get(['id', 'name']);

        return Inertia::render('Admin/Admins/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.Admin::class,
            'email' => 'required|string|email|max:255|unique:'.Admin::class,
            'password' => ['required', 'confirmed', 'min:8'],
            'role' => ['required', Rule::in(['superadmin', 'admin', 'subadmin'])],
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 分配角色
        $role = Role::where('name', $request->role)->where('guard_name', 'admin')->first();
        if ($role) {
            $admin->assignRole($role);
        }

        return redirect()->route('admin.admins.index')->with('success', 'Admin created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        $roles = Role::where('guard_name', 'admin')->get(['id', 'name']);

        return Inertia::render('Admin/Admins/Edit', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'username' => $admin->username,
                'email' => $admin->email,
                'role' => $admin->roles->first()?->name ?? '',
            ],
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.Admin::class.',username,'.$admin->id,
            'email' => 'required|string|email|max:255|unique:'.Admin::class.',email,'.$admin->id,
            'password' => ['nullable', 'confirmed', 'min:8'],
            'role' => ['required', Rule::in(['superadmin', 'admin', 'subadmin'])],
        ]);

        $admin->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
        ]);

        // 更新密码（如果提供）
        if ($request->filled('password')) {
            $admin->update([
                'password' => Hash::make($request->password),
            ]);
        }

        // 更新角色
        $role = Role::where('name', $request->role)->where('guard_name', 'admin')->first();
        if ($role) {
            $admin->syncRoles([$role]);
        }

        return redirect()->route('admin.admins.index')->with('success', 'Admin updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();

        return redirect()->route('admin.admins.index')->with('success', 'Admin deleted successfully.');
    }

    /**
     * Show the admin profile page.
     */
    public function showProfile()
    {
        $admin = auth('admin')->user();

        return Inertia::render('Admin/Profile/ChangePassword', [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'username' => $admin->username,
                'email' => $admin->email,
            ],
        ]);
    }

    /**
     * Update the admin password.
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $admin = auth('admin')->user();

        // 验证当前密码
        if (!Hash::check($request->current_password, $admin->password)) {
            return back()->withErrors(['current_password' => '当前密码不正确。']);
        }

        // 更新密码
        $admin->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', '密码更新成功！');
    }
}
