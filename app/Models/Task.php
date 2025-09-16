<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'photo',
        'is_active',
        'unit_price',
        'unit',
        'total_price',
        'type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'unit' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($task) {
            // 自动计算总价格
            $task->total_price = $task->unit * $task->unit_price;
        });
    }

    /**
     * Get the status options for frontend.
     */
    public static function getStatusOptions()
    {
        return [
            ['value' => true, 'label' => 'active'],
            ['value' => false, 'label' => 'inactive'],
        ];
    }

    /**
     * Get the type options for frontend.
     */
    public static function getTypeOptions()
    {
        return [
            'normal',
            'hidden',
        ];
    }
}
