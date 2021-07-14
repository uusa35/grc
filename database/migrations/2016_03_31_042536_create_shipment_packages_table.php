<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShipmentPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipment_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('image')->nullable();
            $table->string('slug_ar')->nullable();
            $table->string('slug_en')->nullable();
            $table->decimal('charge')->unsigned();
            $table->boolean('active')->default(1);
            $table->boolean('is_available')->default(1);
            $table->text('notes_ar')->nullable();
            $table->text('notes_en')->nullable();
            $table->decimal('charge_one', 6, 2)->unsigned()->nullable();
            $table->decimal('charge_two', 6, 2)->unsigned()->nullable();
            $table->decimal('charge_three', 6, 2)->unsigned()->nullable();
            $table->decimal('charge_four', 6, 2)->unsigned()->nullable();
            $table->decimal('charge_five', 6, 2)->unsigned()->nullable();

            $table->foreignId('country_id')->references('id')->on('countries');
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
        Schema::drop('shipment_packages');
    }
}
