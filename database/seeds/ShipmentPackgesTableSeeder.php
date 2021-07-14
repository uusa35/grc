<?php

use App\Models\Branch;
use App\Models\ShipmentPackage;
use Illuminate\Database\Seeder;

class ShipmentPackgesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ShipmentPackage::class,app()->environment('production') ? 3 : 3)->create();
    }
}
