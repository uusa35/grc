<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->string('slug_ar')->nullable();
            $table->string('slug_en')->nullable();
            $table->mediumText('caption_ar')->nullable();
            $table->mediumText('caption_en')->nullable();
            $table->string('image')->nullable();
            $table->text('content_ar')->nullable();
            $table->text('content_en')->nullable();
            $table->integer('order')->nullable();
            $table->string('keywords')->nullable();
            $table->string('video_url')->nullable();
            $table->string('youtube_video_id')->nullable();
            $table->string('views')->nullable();
            $table->boolean('active')->default(1);

            $table->foreignId('user_id')->references('id')->on('users');

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
        Schema::dropIfExists('posts');
    }
}
