<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_metas', function (Blueprint $table) {
            $table->id();

            $table->string('color')->nullable();
            $table->string('size')->nullable();
            $table->integer('qty')->unsigned();
            $table->date('booked_at')->nullable();
            $table->time('time')->nullable();

            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('shipment_cost', 6, 2)->unsigned()->nullable();
            $table->text('notes')->nullable();
            $table->integer('merchant_id')->nullable();
            $table->boolean('wrap_as_gift')->default(false);

            $table->foreignId('order_id')->references('id')->on('orders');

            $table->morphs('ordermetable');
//            $table->foreignId('product_id')->nullable()->constrained();
//            $table->foreignId('product_attribute_id')->nullable()->constrained();
//            $table->foreignId('color_id')->nullable()->constrained();
//            $table->foreignId('size_id')->nullable()->constrained();
//            $table->foreignId('service_id')->nullable()->constrained();
//            $table->foreignId('timing_id')->nullable()->constrained();
//            $table->foreignId('book_id')->nullable()->constrained();
//            $table->foreignId('course_id')->nullable()->constrained();
//            $table->foreignId('country_id')->nullable()->constrained();

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
        Schema::drop('order_metas');
    }
}
