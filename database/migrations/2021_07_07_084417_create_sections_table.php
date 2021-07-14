<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->longText('content_ar')->nullable();
            $table->longText('content_en')->nullable();
            $table->longText('image')->nullable();
            $table->string('url_one')->nullable();
            $table->string('url_two')->nullable();
            $table->string('url_one_name')->nullable();
            $table->string('url_two_name')->nullable();
            $table->longText('video_url')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('active')->default(1);
            $table->foreignId('template_id')->references('id')->on('templates');
            $table->morphs('sectionable');
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
        Schema::dropIfExists('sections');
    }
}
