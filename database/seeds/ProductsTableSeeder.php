<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Notification;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // each product has the following :
        // many product attributes and
        // belongs to many categories
        // has gallery with images
        // belongs to many orders !!!
        factory(Product::class, app()->environment('production') ? 8 : 50)->create()->each(function ($p) {
            if ($p->has_attributes) {
                $p->product_attributes()->saveMany(factory(ProductAttribute::class, 1)->create());
            }
            $p->slides()->saveMany(Slide::all()->random(2));
            $p->categories()->saveMany(Category::all()->random(2));
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->notificationAlerts()->saveMany(Notification::all()->random(2));
            $p->images()->saveMany(factory(Image::class, 3)->create());
            $p->collections()->saveMany(Collection::all()->random(5));
            $p->userGroup()->saveMany(User::all()->random(3));
        });
    }
}
