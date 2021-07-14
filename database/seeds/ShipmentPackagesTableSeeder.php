<?php

use App\Models\Country;
use App\Models\ShipmentPackage;
use Illuminate\Database\Seeder;

class ShipmentPackagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ShipmentPackage::class, app()->environment('production') ? 2 : 20)->create()->each(function ($q) {
            return $q->countries()->saveMany(Country::all()->random(3));
        });
    }
}
