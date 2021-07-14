<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            // member is the person who is doing the Rate
            $table->foreignId('user_id')->nullable()->constrained();
            // the person who is receiving the rate
            $table->integer('member_id')->nullable()->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->integer('value')->unsigned()->nullable();

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
        Schema::dropIfExists('ratings');
    }
}
