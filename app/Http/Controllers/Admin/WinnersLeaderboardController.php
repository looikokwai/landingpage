<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WinnersLeaderboard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WinnersLeaderboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = WinnersLeaderboard::query();

        // 搜索功能
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('game_name', 'like', "%{$search}%")
                    ->orWhere('player_name', 'like', "%{$search}%");
            });
        }

        // 分类筛选
        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }

        $winners = $query->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(function ($winner) {
                return [
                    'id' => $winner->id,
                    'game_name' => $winner->game_name,
                    'player_name' => $winner->player_name,
                    'bet_amount' => $winner->bet_amount,
                    'multiplier' => $winner->multiplier,
                    'winning_amount' => $winner->winning_amount,
                    'category' => $winner->category,
                    'background_color' => $winner->background_color,
                    'is_active' => $winner->is_active,
                    'order' => $winner->order,
                    'created_at' => $winner->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/WinnersLeaderboard/Index', [
            'winners' => $winners,
            'filters' => $request->only(['search', 'category']),
            'categories' => [
                'latest_winner' => 'Latest Winner',
                'high_roller' => 'High Roller',
                'wager_contest' => 'Wager Contest',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/WinnersLeaderboard/Create', [
            'categories' => [
                'latest_winner' => 'Latest Winner',
                'high_roller' => 'High Roller',
                'wager_contest' => 'Wager Contest',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_name' => 'required|string|max:255',
            'player_name' => 'required|string|max:255',
            'bet_amount' => 'required|numeric|min:0',
            'multiplier' => 'required|string|max:50',
            'winning_amount' => 'required|numeric|min:0',
            'category' => 'required|in:latest_winner,high_roller,wager_contest',
            'background_color' => 'nullable|string|max:7',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;
        $validated['background_color'] = $validated['background_color'] ?? '#f5f5f5';

        WinnersLeaderboard::create($validated);

        return redirect()->route('admin.winners-leaderboard.index')->with('success', 'Winner record created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WinnersLeaderboard $winnersLeaderboard)
    {
        return Inertia::render('Admin/WinnersLeaderboard/Edit', [
            'winner' => [
                'id' => $winnersLeaderboard->id,
                'game_name' => $winnersLeaderboard->game_name,
                'player_name' => $winnersLeaderboard->player_name,
                'bet_amount' => $winnersLeaderboard->bet_amount,
                'multiplier' => $winnersLeaderboard->multiplier,
                'winning_amount' => $winnersLeaderboard->winning_amount,
                'category' => $winnersLeaderboard->category,
                'background_color' => $winnersLeaderboard->background_color,
                'is_active' => $winnersLeaderboard->is_active,
                'order' => $winnersLeaderboard->order,
            ],
            'categories' => [
                'latest_winner' => 'Latest Winner',
                'high_roller' => 'High Roller',
                'wager_contest' => 'Wager Contest',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WinnersLeaderboard $winnersLeaderboard)
    {
        $validated = $request->validate([
            'game_name' => 'required|string|max:255',
            'player_name' => 'required|string|max:255',
            'bet_amount' => 'required|numeric|min:0',
            'multiplier' => 'required|string|max:50',
            'winning_amount' => 'required|numeric|min:0',
            'category' => 'required|in:latest_winner,high_roller,wager_contest',
            'background_color' => 'nullable|string|max:7',
            'is_active' => 'required|string|in:true,false',
            'order' => 'integer|min:0',
        ]);

        $validated['is_active'] = $validated['is_active'] === 'true';
        $validated['order'] = $validated['order'] ?? 0;
        $validated['background_color'] = $validated['background_color'] ?? '#f5f5f5';

        $winnersLeaderboard->update($validated);

        return redirect()->route('admin.winners-leaderboard.index')->with('success', 'Winner record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WinnersLeaderboard $winnersLeaderboard)
    {
        $winnersLeaderboard->delete();

        return redirect()->route('admin.winners-leaderboard.index')->with('success', 'Winner record deleted successfully.');
    }
}
