<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;
    protected $table = "task_list";
   
    protected $fillable = [ 'cliente_id', 'task_type_id', 'task_clasification_id', 'descripcion', 'user_id', ];
  

    public function cliente(): BelongsTo
    {
        return $this->BelongsTo(User::class,'cliente_id');
    }

    public function usuarioAsignado(): BelongsTo
    {
        return $this->BelongsTo(User::class,'user_id');
    }

    public function tipo(): BelongsTo
    {
        return $this->BelongsTo(TaskType::class,'task_type_id');
    }

    public function clasificacion(): BelongsTo
    {
        return $this->BelongsTo(TaskClasification::class,'task_clasification_id');
    }



    

  


}

