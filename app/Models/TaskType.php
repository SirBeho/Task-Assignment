<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskType extends Model
{
    use HasFactory;
    protected $table = "TaskTypes";
    protected $fillable = ['type_name','description','estimated_time','status'];


    public function requisitos(): HasMany
    {
        return $this->hasMany(TaskTypeSkill::class,'task_type_id');
    }

}


    
    
