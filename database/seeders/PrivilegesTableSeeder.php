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
            'category', 'product', 'slide', 'service', 'timing',
            'role', 'user', 'setting', 'currency','video',
            'country', 'gallery', 'page', 'tag', 'brand', 'branch','area',
            'privilege', 'order', 'coupon', 'size', 'color', 'faq', 'commercial',
            'shipment' , 'notification' , 'day', 'device','book'
        ];
        foreach ($privileges as $k => $v) {
                Privilege::create(['name' => $v]);
        }
    }
}
