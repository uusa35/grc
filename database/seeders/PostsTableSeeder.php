<?php
namespace Database\Seeders;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Post;
use App\Models\Slide;
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
        Post::factory(app()->isLocal() ? 10 : 2)->create()->each(function ($p) {
            $p->comments()->saveMany(Comment::factory(5)->create());
            $p->images()->saveMany(Image::factory(5)->create());
            $p->slides()->saveMany(Slide::factory(3)->create());
        });
    }
}
