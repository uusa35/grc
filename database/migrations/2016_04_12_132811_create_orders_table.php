<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable()->default('pending');
            $table->boolean('paid')->default(0);
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('shipment_fees', 6, 2)->unsigned()->nullable(); //
            $table->decimal('discount', 6, 2)->unsigned()->nullable(); //
            $table->decimal('net_price', 6, 2)->unsigned(); // used if coupon code exists
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('area')->nullable();
            $table->string('country')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->mediumText('notes')->nullable();
            $table->string('reference_id')->nullable()->deafult(0);
            $table->string('payment_method')->nullable();

            $table->string('day')->nullable();
            $table->time('time')->nullable();
            $table->dateTime('booked_at')->nullable();
            $table->boolean('receive_on_branch')->default(0);
            $table->string('shipment_reference')->nullable();

            $table->string('block')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('floor')->nullable();
            $table->string('apartment')->nullable();
            $table->boolean('cash_on_delivery')->default(0);

            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('branch_id')->nullable()->constrained();
            $table->foreignId('coupon_id')->nullable()->constrained();
            $table->foreignId('address_id')->nullable()->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('area_id')->nullable()->constrained();
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
        Schema::drop('orders');
    }
}
