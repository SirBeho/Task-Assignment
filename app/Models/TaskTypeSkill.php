<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class TaskTypeSkill extends Model
{
    use HasFactory;
    protected $table = "Task_type_skills";
    protected $fillable = ['task_type_id','skill_id','level','status'];

    public function skill(): BelongsTo
    {
        return $this->BelongsTo(Skill::class,'skill_id');
    }
}
