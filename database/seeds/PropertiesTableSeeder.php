<?php

use App\Models\CategoryGroup;
use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Property::class, app()->environment('production') ? 5 : 40)->create()->each(function ($p) {
            $p->categoryGroups()->saveMany(factory(CategoryGroup::class,1)->create());
        });
    }
}
