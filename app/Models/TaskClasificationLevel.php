<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskClasificationLevel extends Model
{
    use HasFactory;
    protected $table = "clasification_level";
    protected $fillable = ['name','value','color_label'];


  

}


    
    
