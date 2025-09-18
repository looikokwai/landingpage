<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MarqueeText;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarqueeTextController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MarqueeText::query();

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('text', 'like', "%{$search}%");
        }

        $marqueeTexts = $query->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($marqueeText) {
                return [
                    'id' => $marqueeText->id,
                    'text' => $marqueeText->text,
                    'is_active' => $marqueeText->is_active,
                    'order' => $marqueeText->order,
                    'created_at' => $marqueeText->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/MarqueeTexts/Index', [
            'marqueeTexts' => $marqueeTexts,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/MarqueeTexts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        MarqueeText::create($validated);

        return redirect()->route('admin.marquee-texts.index')->with('success', 'Marquee text created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MarqueeText $marqueeText)
    {
        return Inertia::render('Admin/MarqueeTexts/Edit', [
            'marqueeText' => [
                'id' => $marqueeText->id,
                'text' => $marqueeText->text,
                'is_active' => $marqueeText->is_active,
                'order' => $marqueeText->order,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MarqueeText $marqueeText)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        $marqueeText->update($validated);

        return redirect()->route('admin.marquee-texts.index')->with('success', 'Marquee text updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MarqueeText $marqueeText)
    {
        $marqueeText->delete();

        return redirect()->route('admin.marquee-texts.index')->with('success', 'Marquee text deleted successfully.');
    }
}
