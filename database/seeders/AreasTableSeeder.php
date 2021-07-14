<?php
namespace Database\Seeders;
use App\Models\Area;
use App\Models\Country;
use App\Models\Governate;
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
            Area::create([
                'name' => $area->name,
                'name_en' => $area->name,
                'name_ar' => $area->name,
                'code' => $area->code,
                'country_id' => Country::where('is_local', true)->first()->id,
                'governate_id' => Governate::all()->random()->id,
                'order' => random_int(1,99),
            ]);
        }
    }
}
