<?php

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Post::class, app()->environment('production') ? 2 : 30)->create()->each(function ($p) {
            $p->comments()->create();
            $p->images()->create();
        });
    }
}
