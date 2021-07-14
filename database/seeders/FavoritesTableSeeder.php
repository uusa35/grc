<?php
namespace Database\Seeders;
use App\Models\Favorite;
use Illuminate\Database\Seeder;

class FavoritesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Favorite::class,20)->create();
    }
}
