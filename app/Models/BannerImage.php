<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class BannerImage extends Model
{
    use HasFactory;

    protected $table = 'banner_images';

    protected $fillable = [
        'title',
        'image_path',
        'link_url',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope a query to only include active banner images.
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
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // 删除记录时同时删除图片文件
        static::deleting(function ($bannerImage) {
            if ($bannerImage->image_path && Storage::disk('public')->exists($bannerImage->image_path)) {
                Storage::disk('public')->delete($bannerImage->image_path);
            }
        });

        // 更新记录时删除旧图片
        static::updating(function ($bannerImage) {
            $originalImagePath = $bannerImage->getOriginal('image_path');
            $newImagePath = $bannerImage->image_path;

            if ($originalImagePath && $originalImagePath !== $newImagePath && Storage::disk('public')->exists($originalImagePath)) {
                Storage::disk('public')->delete($originalImagePath);
            }
        });
    }
}
