<?php

use App\Models\Newsletter;
use Illuminate\Database\Seeder;

class NewslettersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Newsletter::class, app()->environment('production') ? 2 : 10)->create();
    }
}
