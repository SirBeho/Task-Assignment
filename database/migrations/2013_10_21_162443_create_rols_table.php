<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        schema::create('config', function (Blueprint $table) {
            $table->id();
            $table->integer('range_level_min');
            $table->integer('range_level_max');
            $table->string('work_queue');

            $table->timestamps();
        });
        
        Schema::create('rols', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('status')->default(1);
            $table->timestamps();
        });

        //tabla config
     
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rols');
        Schema::dropIfExists('config');
    }
}
