<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->mediumText('name_ar')->nullable();
            $table->mediumText('name_en')->nullable();
            $table->mediumText('caption_ar')->nullable();
            $table->mediumText('caption_en')->nullable();
            $table->mediumText('description_ar')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->mediumText('notes_ar')->nullable();
            $table->mediumText('notes_en')->nullable();
            $table->boolean('on_sale')->default(0);
            $table->boolean('free')->default(true);
            $table->integer('months')->default(1);
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('sale_price', 6, 2)->unsigned();
            $table->softDeletes();
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
        Schema::dropIfExists('subscriptions');
    }
}
