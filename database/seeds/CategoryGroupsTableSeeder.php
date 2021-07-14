<?php

use App\Models\CategoryGroup;
use Illuminate\Database\Seeder;

class CategoryGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(CategoryGroup::class, app()->environment('production') ? 2 : 10)->create();
    }
}
