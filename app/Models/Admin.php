<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the parent admin.
     */
    public function parent()
    {
        return $this->belongsTo(Admin::class, 'parent_id');
    }

    /**
     * Get the child admins (sub-admins).
     */
    public function children()
    {
        return $this->hasMany(Admin::class, 'parent_id');
    }

    /**
     * Find admin by username or email.
     */
    public static function findByUsernameOrEmail($identifier)
    {
        return static::where('username', $identifier)
                    ->orWhere('email', $identifier)
                    ->first();
    }
}
