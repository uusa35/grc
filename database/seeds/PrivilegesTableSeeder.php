<?php

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
            'category', 'product', 'slide', 'service', 'timing',
            'role', 'user', 'setting', 'currency', 'aboutus','video',
            'country', 'gallery', 'page', 'tag', 'brand', 'branch','area',
            'privilege', 'order', 'coupon', 'size', 'color', 'faq', 'commercial',
            'collection','shipment', 'term', 'policy' , 'notification' , 'day', 'device',
            'survey','question','result','questionnaire','answer','classified','property','group',
            'addon','item'
        ];
        foreach ($privileges as $k => $v) {
                factory(Privilege::class)->create(['name' => $v]);
        }
    }
}
