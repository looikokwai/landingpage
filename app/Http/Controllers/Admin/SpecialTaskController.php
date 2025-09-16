<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpecialTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::query();

        // 只显示special类型的任务
        $query->where('type', 'special');

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 状态筛选
        if ($request->filled('status')) {
            $query->where('is_active', $request->get('status'));
        }

        $tasks = $query->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($task) {
                return [
                    'id' => $task->id,
                    'name' => $task->name,
                    'description' => $task->description,
                    'photo' => $task->photo,
                    'is_active' => $task->is_active,
                    'unit_price' => $task->unit_price,
                    'unit' => $task->unit,
                    'total_price' => $task->total_price,
                    'type' => $task->type,
                    'created_at' => $task->created_at,
                    'updated_at' => $task->updated_at,
                ];
            });

        return Inertia::render('Admin/SpecialTasks/Index', [
            'tasks' => $tasks,
            'filters' => $request->only(['search', 'status']),
            'statusOptions' => Task::getStatusOptions(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/SpecialTasks/Create', [
            'statusOptions' => Task::getStatusOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'required|string|in:true,false',
            'unit_price' => 'required|numeric|min:0',
            'unit' => 'required|integer|min:1',
        ]);

        // 强制设置为special类型
        $validated['type'] = 'special';

        // 转换is_active为布尔值
        $validated['is_active'] = $validated['is_active'] === 'true';

        // 处理图片上传
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('tasks', 'public');
        }

        Task::create($validated);

        return redirect()->route('admin.special-tasks.index')
            ->with('success', 'Special Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('Admin/SpecialTasks/Show', [
            'task' => [
                'id' => $task->id,
                'name' => $task->name,
                'description' => $task->description,
                'photo' => $task->photo,
                'is_active' => $task->is_active,
                'unit_price' => $task->unit_price,
                'unit' => $task->unit,
                'total_price' => $task->total_price,
                'type' => $task->type,
                'created_at' => $task->created_at,
                'updated_at' => $task->updated_at,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return Inertia::render('Admin/SpecialTasks/Edit', [
            'task' => [
                'id' => $task->id,
                'name' => $task->name,
                'description' => $task->description,
                'photo' => $task->photo,
                'is_active' => $task->is_active,
                'unit_price' => $task->unit_price,
                'unit' => $task->unit,
                'total_price' => $task->total_price,
                'type' => $task->type,
            ],
            'statusOptions' => Task::getStatusOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'required|string|in:true,false',
            'unit_price' => 'required|numeric|min:0',
            'unit' => 'required|integer|min:1',
        ]);

        // 保持为special类型
        $validated['type'] = 'special';

        // 转换is_active为布尔值
        $validated['is_active'] = $validated['is_active'] === 'true';

        // 处理图片上传
        if ($request->hasFile('photo')) {
            // 删除旧图片
            if ($task->photo) {
                Storage::disk('public')->delete($task->photo);
            }
            $validated['photo'] = $request->file('photo')->store('tasks', 'public');
        }

        $task->update($validated);

        return redirect()->route('admin.special-tasks.index')
            ->with('success', 'Special Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        // 删除图片
        if ($task->photo) {
            Storage::disk('public')->delete($task->photo);
        }

        $task->delete();

        return redirect()->route('admin.special-tasks.index')
            ->with('success', 'Special Task deleted successfully.');
    }
}
