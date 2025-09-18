<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class GameSection extends Model
{
    use HasFactory;

    protected $table = 'game_sections';

    protected $fillable = [
        'section_name',
        'section_type',
        'games_data',
        'is_active',
        'order',
    ];

    protected $casts = [
        'games_data' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope a query to only include active game sections.
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
     * Scope a query to filter by section type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('section_type', $type);
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // 删除记录时同时删除所有相关图片文件
        static::deleting(function ($gameSection) {
            if ($gameSection->games_data && is_array($gameSection->games_data)) {
                foreach ($gameSection->games_data as $game) {
                    if (isset($game['image']) && Storage::disk('public')->exists($game['image'])) {
                        Storage::disk('public')->delete($game['image']);
                    }
                }
            }
        });

        // 更新记录时删除旧图片
        static::updating(function ($gameSection) {
            $originalGamesData = $gameSection->getOriginal('games_data');
            $newGamesData = $gameSection->games_data;

            if ($originalGamesData && is_array($originalGamesData)) {
                foreach ($originalGamesData as $originalGame) {
                    if (isset($originalGame['image'])) {
                        $originalImage = $originalGame['image'];
                        $imageStillUsed = false;

                        // 检查新数据中是否还在使用这个图片
                        if ($newGamesData && is_array($newGamesData)) {
                            foreach ($newGamesData as $newGame) {
                                if (isset($newGame['image']) && $newGame['image'] === $originalImage) {
                                    $imageStillUsed = true;
                                    break;
                                }
                            }
                        }

                        // 如果图片不再使用，删除它
                        if (!$imageStillUsed && Storage::disk('public')->exists($originalImage)) {
                            Storage::disk('public')->delete($originalImage);
                        }
                    }
                }
            }
        });
    }
}
