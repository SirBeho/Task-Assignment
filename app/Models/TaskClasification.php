<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskClasification extends Model
{
    use HasFactory;
    protected $table = "task_clasification";
    protected $fillable = ['name','impact _level'];


    public function impact (): BelongsTo
    {
        return $this->BelongsTo(TaskClasificationLevel::class,'impact_level');
    }

}


    
    
