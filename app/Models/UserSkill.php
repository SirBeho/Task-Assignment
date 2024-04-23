<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSkill extends Model
{
    use HasFactory;
    protected $table = "user_skills";

    protected $fillable = [
        'user_id',
        'skill_id',
        'level',
        'status',
    ];  

    public function skill(): BelongsTo
    {
        return $this->BelongsTo(Skill::class,'skill_id');
    }

}



