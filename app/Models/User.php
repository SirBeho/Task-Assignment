<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'name',
        'telefono',
        'email',
        'password',
        'rol_id',
        'status',
        
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
  
   public function Tasks(): HasMany
    {
        return $this->hasMany(Task::class,'user_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class,'user_id');
    }

    public function rol(): BelongsTo
    {
        return $this->BelongsTo(Rol::class)->select('id', 'name');
    }

    public function skills(): HasMany
    {
        return $this->hasMany(UserSkill::class,'user_id');
    }

    
    
    

}
