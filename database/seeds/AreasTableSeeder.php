<?php

use App\Models\Area;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = json_decode(file_get_contents('areas.json'));
        foreach ($areas as $area) {
            factory(Area::class, 1)->create([
                'name' => $area->name_en,
                'slug_en' => $area->name_en,
                'slug_ar' => $area->name_ar,
                'country_id' => $area->country_id,
                'governate_id' => $area->governate_id,
                'order' => $area->order,
            ]);
        }
    }
}
