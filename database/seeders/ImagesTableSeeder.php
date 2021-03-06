<?php
namespace Database\Seeders;
use App\Models\Image;
use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Image::class,app()->environment('production',1) ? 5 : 500)->create();
    }
}
