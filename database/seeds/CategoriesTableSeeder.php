<?php

use App\Models\Category;
use App\Models\CategoryGroup;
use App\Models\Property;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Category::class, app()->environment('production') ? 2 : 4)->create(['parent_id' => 0])->each(function ($c) {
            // children
            $childOne = factory(Category::class)->create(['parent_id' => $c->id]);
            $childTow = factory(Category::class)->create(['parent_id' => $c->id]);
            $c->children()->saveMany([$childOne, $childTow]);
            // children of children
            $childOne->children()->saveMany(factory(Category::class, 2)->create(['parent_id' => $childOne->id]));
            $childTow->children()->saveMany(factory(Category::class, 2)->create(['parent_id' => $childTow->id]));
        });
    }
}
