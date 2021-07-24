<?php

namespace Database\Seeders;

use App\Models\Privilege;
use Illuminate\Database\Seeder;

class PrivilegesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $privileges = [
            'category' => false,
            'product' => true,
            'slide' => true,
            'service' => true,
            'timing' => false,
            'role' => false,
            'user' => true,
            'setting' => true,
            'currency' => false,
            'video' => false,
            'country' => false,
            'gallery' => false,
            'page' => false,
            'tag' => false,
            'brand' => false,
            'branch' => false,
            'area' => false,
            'privilege' => false,
            'order' => true,
            'coupon' => false,
            'size' => false,
            'color' => false,
            'faq' => false,
            'commercial' => false,
            'shipment' => false,
            'notification' => false,
            'day' => false,
            'device' => false,
            'book' => true,
            'address' => false,
            'section' => false,
            'post' => false,
            'course' => true
        ];
        foreach ($privileges as $k => $v) {
            Privilege::factory(1)->create(['name' => $k, 'name_en' => $k, 'name_ar' => $k, 'main_menu' => $v]);
        }
    }
}
