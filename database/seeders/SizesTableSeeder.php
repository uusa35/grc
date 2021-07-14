<?php
namespace Database\Seeders;
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
        Size::factory(4)->create();
    }
}
