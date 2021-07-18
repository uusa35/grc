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

            $table->integer('qty')->unsigned();
            // price of the product / service  on the time the order is made (sale price in case on_sale applied)
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('shipment_cost',6,2)->unsigned()->nullable();
            $table->text('notes')->nullable();

            $table->integer('merchant_id')->nullable();
            $table->string('item_type')->nullable();
            $table->string('item_name')->nullable();
            $table->string('product_size')->nullable();
            $table->string('product_color')->nullable();

            $table->date('service_date')->nullable();
            $table->time('service_time')->nullable();
            $table->boolean('wrap_as_gift')->default(false);

            $table->foreignId('order_id')->references('id')->on('orders');
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('product_attribute_id')->nullable()->constrained();
            $table->foreignId('service_id')->nullable()->constrained();
            $table->foreignId('book_id')->nullable()->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('timing_id')->nullable()->constrained();


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
