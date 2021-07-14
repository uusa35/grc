<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timings', function (Blueprint $table) {
            $table->id();
            $table->string('day')->nullable();
            $table->string('day_name_ar')->nullable();
            $table->string('day_name_en')->nullable();
            $table->boolean('active')->default(1);
            $table->time('start');
            $table->time('end')->nullable();
            $table->boolean('is_off')->default(0);
            $table->boolean('allow_multi_select')->default(0);
            $table->boolean('is_available')->default(1);
            $table->string('today')->nullable();
            $table->string('type')->nullable();
            $table->string('notes_ar')->nullable();
            $table->string('notes_en')->nullable();
            $table->integer('order')->nullable();

            $table->smallInteger('week_start')->default(6)->nullable();
            $table->smallInteger('day_no')->nullable();

            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('service_id')->references('id')->on('services');
            $table->foreignId('day_id')->references('id')->on('days');

            $table->timestamps();
        });
    }
    /*
     * doing a service that has a specific date and specific time
     * timings : working days
     *
     * Sun , Mon , tue , wed , thur : from 8 to 3
     * Friday is off
     * Saturday is off
     *
     * */

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('timings');
    }
}
