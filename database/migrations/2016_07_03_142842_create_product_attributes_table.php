<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('size_id')->nullable()->constrained();
            $table->foreignId('color_id')->nullable()->constrained();
            $table->integer('qty')->unsigned()->default(false);
            $table->text('notes_ar')->nullable();
            $table->text('notes_en')->nullable();
            $table->decimal('price', 6, 2)->unsigned();

            $table->unique(['product_id','size_id','color_id']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('product_attributes');
    }
}
