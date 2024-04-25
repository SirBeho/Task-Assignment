<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;
    protected $table = "config";
    public $timestamps = false;

    protected $fillable = [
        'range_level_min',
        'range_level_max',
    ];
}
