<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            $table->string('name_ar');
            $table->string('name_en');
            $table->mediumText('caption_ar')->nullable();
            $table->mediumText('caption_en')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->mediumText('description_ar')->nullable();

            $table->boolean('limited')->default(0);
            $table->boolean('on_home')->default(0);
            $table->boolean('on_new')->default(0);
            $table->boolean('is_parent')->default(0);
            $table->boolean('is_featured')->default(0);
            $table->boolean('is_service')->default(0);
            $table->boolean('is_product')->default(0);
            $table->boolean('is_commercial')->default(0);
            $table->boolean('is_user')->default(0);
            $table->boolean('is_book')->default(0);
            $table->string('image_square')->nullable();
            $table->string('image_rectangle')->nullable();
            $table->string('icon')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('is_classified')->default(0);
            $table->boolean('is_real_estate')->default(0);
            $table->integer('min')->default(0)->nullable();
            $table->bigInteger('max')->default(0)->nullable();
            $table->string('path')->nullable();
            $table->boolean('active')->default(1);

            $table->integer('parent_id')->nullable()->unsigned()->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void'
     */
    public function down()
    {
        Schema::drop('categories');
    }
}
