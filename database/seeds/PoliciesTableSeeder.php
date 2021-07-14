<?php

use App\Models\Policy;
use Illuminate\Database\Seeder;

class PoliciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Policy::class, app()->environment('production') ? 1 : 10)->create();
    }
}
