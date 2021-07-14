<?php
namespace Database\Seeders;
use App\Models\Area;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Notification;
use App\Models\Post;
use App\Models\ShipmentPackage;
use App\Models\Slide;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(app()->isLocal() ? 10 : 5)->create()->each(function ($u) {
            if ($u->id === 1) {
                $u->update(['role_id' => 1]);
            }
            $u->categories()->saveMany(Category::all()->random(2));
            $u->slides()->saveMany(Slide::factory(2)->create());
            $u->images()->saveMany(Image::factory(2)->create());
            $u->comments()->saveMany(Comment::factory( 2)->create());
            $u->notificationAlerts()->saveMany(Notification::factory(2)->create());
        });
    }
}
