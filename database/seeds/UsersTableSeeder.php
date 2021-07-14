<?php

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
        factory(User::class, app()->environment('production') ? 5 : 10)->create()->each(function ($u) {
            if ($u->id === 1) {
                $u->update(['role_id' => 1]);
            }
            if ($u->isDesigner) {
                $u->collections()->saveMany(factory(Collection::class, 1)->create());
                $u->surveys()->saveMany(Survey::all()->random(1));
            }
            if ($u->isCompany) {
                $u->areas()->saveMany(Area::all()->random(3));
            }
            $u->categories()->saveMany(Category::all()->random(2));
            $u->slides()->saveMany(factory(Slide::class, 2)->create());
            $u->images()->saveMany(factory(Image::class, 2)->create());
            $u->comments()->saveMany(factory(Comment::class, 2)->create());
            $u->notificationAlerts()->saveMany(Notification::all()->random(2));
        });
    }
}
