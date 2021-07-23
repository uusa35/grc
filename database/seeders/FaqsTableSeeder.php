<?php
namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Faq::factory()->create(app()->isLocal() ? 5 : 1);
    }
}
