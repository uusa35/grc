<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug_ar')->nullable();
            $table->string('slug_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->boolean('is_admin')->default(0);
            $table->boolean('is_super')->default(0);
            $table->boolean('is_client')->default(0);
            $table->boolean('is_company')->default(0);
            $table->boolean('is_designer')->default(0);
            $table->boolean('is_celebrity')->default(0);
            $table->boolean('is_visible')->default(0);
            $table->boolean('active')->default(1);
            $table->integer('order')->nullable();
            $table->string('color')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_driver')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
