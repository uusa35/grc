<?php

use App\Models\Slide;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Video::class,app()->environment('production') ? 2 : 90)->create();
    }
}
