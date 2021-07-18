<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServiceTimingPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_timing', function (Blueprint $table) {
            $table->foreignId('service_id')->references('id')->on('services');
            $table->foreignId('timing_id')->references('id')->on('timings');
            $table->primary(['service_id', 'timing_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_timing');
    }
}
