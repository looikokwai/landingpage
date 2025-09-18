<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WinnersLeaderboard extends Model
{
    use HasFactory;

    protected $table = 'winners_leaderboard';

    protected $fillable = [
        'game_name',
        'player_name',
        'bet_amount',
        'multiplier',
        'winning_amount',
        'category',
        'background_color',
        'is_active',
        'order',
    ];

    protected $casts = [
        'bet_amount' => 'decimal:2',
        'winning_amount' => 'decimal:2',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope a query to only include active winners.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by order field.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
