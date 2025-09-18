<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BannerImage::query();

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('title', 'like', "%{$search}%");
        }

        $bannerImages = $query->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($bannerImage) {
                return [
                    'id' => $bannerImage->id,
                    'title' => $bannerImage->title,
                    'image_path' => $bannerImage->image_path,
                    'link_url' => $bannerImage->link_url,
                    'is_active' => $bannerImage->is_active,
                    'order' => $bannerImage->order,
                    'created_at' => $bannerImage->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/BannerImages/Index', [
            'bannerImages' => $bannerImages,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BannerImages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'link_url' => 'nullable|string|max:500',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        // 处理图片上传
        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('banners', 'public');
        }
        unset($validated['image']);

        BannerImage::create($validated);

        return redirect()->route('admin.banner-images.index')->with('success', 'Banner image created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BannerImage $bannerImage)
    {
        return Inertia::render('Admin/BannerImages/Edit', [
            'bannerImage' => [
                'id' => $bannerImage->id,
                'title' => $bannerImage->title,
                'image_path' => $bannerImage->image_path,
                'link_url' => $bannerImage->link_url,
                'is_active' => $bannerImage->is_active,
                'order' => $bannerImage->order,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BannerImage $bannerImage)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'link_url' => 'nullable|string|max:500',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        // 如果有新图片上传，处理图片
        if ($request->hasFile('image')) {
            // 删除旧图片
            if ($bannerImage->image_path) {
                Storage::disk('public')->delete($bannerImage->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('banners', 'public');
        }

        if (isset($validated['image'])) {
            unset($validated['image']);
        }

        $bannerImage->update($validated);

        return redirect()->route('admin.banner-images.index')->with('success', 'Banner image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BannerImage $bannerImage)
    {
        if ($bannerImage->image_path) {
            Storage::disk('public')->delete($bannerImage->image_path);
        }

        $bannerImage->delete();

        return redirect()->route('admin.banner-images.index')->with('success', 'Banner image deleted successfully.');
    }
}
