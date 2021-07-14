<?php

use App\Models\Fan;
use Illuminate\Database\Seeder;

class FansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Fan::class, env('production') ? 5 : 300 )->create();
    }
}
