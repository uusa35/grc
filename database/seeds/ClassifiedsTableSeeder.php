<?php

use App\Models\CategoryGroup;
use App\Models\Classified;
use App\Models\Image;
use App\Models\Notification;
use App\Models\Property;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ClassifiedsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Classified::class, app()->environment('production') ? 2 : 50)->create()->each(function ($c) {
            $property = Property::all()->random(1)->first();
            DB::table('classified_property')->insert(
                [
                    'classified_id' => $c->id,
                    'category_group_id' => $property->categoryGroups()->first()->id,
                    'property_id' => $property->id,
                    'value' => $property->value
                ]
            );
            $c->tags()->saveMany(Tag::all()->random(2));
            $c->notificationAlerts()->saveMany(Notification::all()->random(2));
            $c->images()->saveMany(factory(Image::class, 3)->create());
        });
    }
}
