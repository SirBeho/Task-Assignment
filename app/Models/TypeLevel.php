<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeLevel extends Model
{
    use HasFactory;
    protected $table = "type_level";
    protected $fillable = ['name','min','max'];


  

}


    
    
