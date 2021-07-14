<?php

use App\Models\Commercial;
use Illuminate\Database\Seeder;

class CommercialsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Commercial::class,10)->create();
    }
}
