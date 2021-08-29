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
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->mediumText('description_ar')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->string('image')->nullable();
            $table->string('notes_ar')->nullable();
            $table->string('notes_en')->nullable();
            $table->integer('months')->default(1);
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('sale_price', 6, 2)->unsigned();
            $table->boolean('free')->default(1);
            $table->boolean('is_featured')->default(0);
            $table->boolean('on_sale')->default(0);
            $table->string('code')->nullable();
            $table->boolean('active')->default(1);
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
