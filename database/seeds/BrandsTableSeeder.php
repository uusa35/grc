<?php

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Brand::class, app()->environment('production') ? 2 : 10)->create();
    }
}
