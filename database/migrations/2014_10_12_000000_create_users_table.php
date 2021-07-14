<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->mediumText('slug_ar')->nullable();
            $table->mediumText('slug_en')->nullable();
            $table->mediumText('description_ar')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->mediumText('service_ar')->nullable();
            $table->mediumText('service_en')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->string('image')->nullable();
            $table->string('banner')->nullable();
            $table->string('bg')->nullable();
            $table->string('address')->nullable();
            $table->string('area')->nullable();
            $table->string('block')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('floor')->nullable();
            $table->string('apartment')->nullable();
            $table->string('country_name')->nullable();
            $table->mediumText('policy_ar')->nullable();
            $table->mediumText('policy_en')->nullable();
            $table->mediumText('cancellation_ar')->nullable();
            $table->mediumText('cancellation_en')->nullable();
            $table->string('keywords')->nullable();
            $table->string('qr')->nullable();

            $table->string('path')->nullable();
            $table->string('website')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('youtube')->nullable();
            $table->string('twitter')->nullable();

            $table->string('whatsapp')->nullable();
            $table->string('iphone')->nullable();
            $table->string('android')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->integer('balance')->default(0)->nullable();
            $table->string('player_id')->nullable();
            $table->string('video_url_one')->nullable();
            $table->string('video_url_two')->nullable();
            $table->string('video_url_three')->nullable();
            $table->string('video_url_four')->nullable();
            $table->string('video_url_five')->nullable();

            $table->boolean('on_home')->default(0);
            $table->boolean('active')->default(1);

            $table->foreignId('role_id')->references('id')->on('roles');
            $table->foreignId('country_id')->references('id')->on('countries');
            $table->foreignId('governate_id')->nullable()->constrained();
            $table->foreignId('area_id')->nullable()->constrained();

            $table->string('merchant_id')->nullable();
            $table->string('api_token')->nullable();
            $table->integer('views')->unsigned()->default(1);

            $table->boolean('is_available')->default(0);
            $table->boolean('is_online')->default(0);
            $table->boolean('access_dashboard')->default(1);
            $table->string('address_2')->nullable();
            $table->string('address_3')->nullable();
            $table->boolean('is_male')->default(0);
            $table->boolean('mobile_verified')->default(0);
            $table->text('mobile_code')->nullable();
            $table->decimal('fixed_amount_subscription', 6, 2)->unsigned()->default(0);
            $table->decimal('percentage_subscription', 6, 2)->unsigned()->default(0);
            $table->dateTime('start_subscription')->nullable();
            $table->dateTime('end_subscription')->nullable();
            $table->longText('code')->nullable();
            $table->boolean('custome_delivery')->default(0);
            $table->decimal('custome_delivery_fees', 4, 2)->unsigned()->default(0.00);

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
