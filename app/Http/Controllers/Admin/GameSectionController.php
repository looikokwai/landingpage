<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GameSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GameSection::query();

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('section_name', 'like', "%{$search}%");
        }


        $gameSections = $query->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($gameSection) {
                return [
                    'id' => $gameSection->id,
                    'section_name' => $gameSection->section_name,
                    'section_type' => $gameSection->section_type,
                    'games_count' => count($gameSection->games_data ?? []),
                    'is_active' => $gameSection->is_active,
                    'order' => $gameSection->order,
                    'created_at' => $gameSection->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/GameSections/Index', [
            'gameSections' => $gameSections,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/GameSections/Create', [
            'sectionTypes' => [
                'popular_games' => 'Popular Games',
                'jackpot_games' => 'Jackpot Games',
                'live_casino' => 'Live Casino',
                'payment_gateway' => 'Payment Gateway',
                'gaming_provider' => 'Gaming Provider',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_name' => 'required|string|max:255',
            'section_type' => 'required|in:popular_games,jackpot_games,live_casino,payment_gateway,gaming_provider',
            'games_data' => 'required|array',
            'games_data.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'games_data.*.name' => 'required|string',
            'games_data.*.provider' => 'required|string',
            'games_data.*.rtp' => 'required|string',
            'games_data.*.status' => 'required|string|in:none,hot,new',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        // 处理游戏图片上传
        $processedGamesData = [];
        if ($request->has('games_data')) {
            foreach ($request->games_data as $gameData) {
                $gameInfo = [
                    'name' => $gameData['name'],
                    'provider' => $gameData['provider'],
                    'rtp' => $gameData['rtp'],
                    'status' => $gameData['status'],
                    'image' => null,
                ];

                if (isset($gameData['image']) && $gameData['image'] instanceof \Illuminate\Http\UploadedFile) {
                    $gameInfo['image'] = $gameData['image']->store('games', 'public');
                }

                $processedGamesData[] = $gameInfo;
            }
        }
        $validated['games_data'] = $processedGamesData;

        GameSection::create($validated);

        return redirect()->route('admin.game-sections.index')->with('success', 'Game section created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GameSection $gameSection)
    {
        // 处理游戏数据中的图片路径
        $gamesData = $gameSection->games_data;
        if ($gamesData && is_array($gamesData)) {
            $gamesData = array_map(function ($game) {
                if (isset($game['image'])) {
                    $game['image'] = '/storage/' . $game['image'];
                }
                return $game;
            }, $gamesData);
        }

        return Inertia::render('Admin/GameSections/Edit', [
            'gameSection' => [
                'id' => $gameSection->id,
                'section_name' => $gameSection->section_name,
                'section_type' => $gameSection->section_type,
                'games_data' => $gamesData,
                'is_active' => $gameSection->is_active,
                'order' => $gameSection->order,
            ],
            'sectionTypes' => [
                'popular_games' => 'Popular Games',
                'jackpot_games' => 'Jackpot Games',
                'live_casino' => 'Live Casino',
                'payment_gateway' => 'Payment Gateway',
                'gaming_provider' => 'Gaming Provider',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GameSection $gameSection)
    {
        $validated = $request->validate([
            'section_name' => 'required|string|max:255',
            'section_type' => 'required|in:popular_games,jackpot_games,live_casino,payment_gateway,gaming_provider',
            'games_data' => 'required|array',
            'games_data.*.image' => 'nullable', // 允许文件、null或字符串路径
            'games_data.*.name' => 'required|string',
            'games_data.*.provider' => 'required|string',
            'games_data.*.rtp' => 'required|string',
            'games_data.*.status' => 'required|string|in:none,hot,new',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;

        // 处理游戏图片上传
        $processedGamesData = [];
        $originalGamesData = $gameSection->games_data ?? [];

        if ($request->has('games_data')) {
            foreach ($request->games_data as $index => $gameData) {
                $gameInfo = [
                    'name' => $gameData['name'],
                    'provider' => $gameData['provider'],
                    'rtp' => $gameData['rtp'],
                    'status' => $gameData['status'],
                ];

                $originalImagePath = $originalGamesData[$index]['image'] ?? null;

                // 情况1：上传了新图片
                if (isset($gameData['image']) && $gameData['image'] instanceof \Illuminate\Http\UploadedFile) {
                    if ($originalImagePath) {
                        Storage::disk('public')->delete($originalImagePath);
                    }
                    $gameInfo['image'] = $gameData['image']->store('games', 'public');
                }
                // 情况2：明确删除了图片 (字段存在且为null)
                else if (array_key_exists('image', $gameData) && $gameData['image'] === null) {
                    if ($originalImagePath) {
                        Storage::disk('public')->delete($originalImagePath);
                    }
                    $gameInfo['image'] = null;
                }
                // 情况3：未作更改，保留原图片
                else {
                    $gameInfo['image'] = $originalImagePath;
                }

                $processedGamesData[] = $gameInfo;
            }
        }
        $validated['games_data'] = $processedGamesData;

        $gameSection->update($validated);

        return redirect()->route('admin.game-sections.index')->with('success', 'Game section updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GameSection $gameSection)
    {
        // 删除游戏图片
        if ($gameSection->games_data && is_array($gameSection->games_data)) {
            foreach ($gameSection->games_data as $game) {
                if (isset($game['image']) && $game['image']) {
                    Storage::disk('public')->delete($game['image']);
                }
            }
        }

        $gameSection->delete();

        return redirect()->route('admin.game-sections.index')->with('success', 'Game section deleted successfully.');
    }
}
