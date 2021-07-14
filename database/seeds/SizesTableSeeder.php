<?php

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Size::class, app()->environment('production') ? 3 : 5)->create();
    }
}
