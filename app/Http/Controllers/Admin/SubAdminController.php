<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class SubAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $admin = Auth::user();

        // Superadmins and devs can see all subadmins.
        // Other admins can only see their own children.
        if ($admin->hasRole(['superadmin', 'dev'])) {
            $query = Admin::query()->whereHas('roles', function ($q) {
                $q->where('name', 'subadmin');
            });
        } else {
            $query = $admin->children()->whereHas('roles', function ($q) {
                $q->where('name', 'subadmin');
            });
        }


        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $subAdmins = $query->with('roles')->paginate(20)->through(function ($admin) {
            return [
                'id' => $admin->id,
                'name' => $admin->name,
                'username' => $admin->username,
                'email' => $admin->email,
                'role' => $admin->roles->first()?->name ?? '无角色',
                'created_at' => $admin->created_at,
                'parent_admin' => $admin->parent ? [
                    'id' => $admin->parent->id,
                    'name' => $admin->parent->name,
                ] : null,
            ];
        });

        return Inertia::render('Admin/SubAdmins/Index', [
            'subAdmins' => $subAdmins,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/SubAdmins/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:admins',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => ['required', 'confirmed', 'min:8'],
            // 暂时移除 websites 验证，因为相关功能已删除
        ]);

        $subAdmin = Admin::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'parent_id' => Auth::id(), // Set the parent_id to the current admin's id
        ]);

        // 分配 subadmin 角色
        $role = Role::where('name', 'subadmin')->where('guard_name', 'admin')->first();
        if ($role) {
            $subAdmin->assignRole($role);
        }

        // 暂时移除网站权限分配，因为相关功能已删除

        return redirect()->route('admin.sub-admins.index')
            ->with('success', '子管理员创建成功');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $subAdmin)
    {
        return Inertia::render('Admin/SubAdmins/Show', [
            'subAdmin' => [
                'id' => $subAdmin->id,
                'name' => $subAdmin->name,
                'username' => $subAdmin->username,
                'email' => $subAdmin->email,
                'role' => $subAdmin->roles->first()?->name ?? '无角色',
                'created_at' => $subAdmin->created_at,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $subAdmin)
    {
        return Inertia::render('Admin/SubAdmins/Edit', [
            'subAdmin' => [
                'id' => $subAdmin->id,
                'name' => $subAdmin->name,
                'username' => $subAdmin->username,
                'email' => $subAdmin->email,
                'role' => $subAdmin->roles->first()?->name ?? '',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $subAdmin)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:admins,username,'.$subAdmin->id,
            'email' => 'required|string|email|max:255|unique:admins,email,'.$subAdmin->id,
            'password' => ['nullable', 'confirmed', 'min:8'],
            // 暂时移除 websites 验证，因为相关功能已删除
        ]);

        $subAdmin->update([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
        ]);

        // 更新密码（如果提供）
        if ($request->filled('password')) {
            $subAdmin->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        // 暂时移除网站权限更新，因为相关功能已删除

        return redirect()->route('admin.sub-admins.index')
            ->with('success', '子管理员更新成功');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $subAdmin)
    {
        $subAdmin->delete();

        return redirect()->route('admin.sub-admins.index')
            ->with('success', '子管理员删除成功');
    }
}
