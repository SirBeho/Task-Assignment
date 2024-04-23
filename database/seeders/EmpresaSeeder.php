<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
       Config::factory()->create([
        'RNC'=> '132706498',
        'empresa'=> 'Task Assignment SRL',
        'direccion'=> 'C/22A apto N1, Embrujo III, Santiago Rep. Dom.',
        'telefono'=> '809-805-7566',
        'telefono2'=> null
    ]);
    }
}
