<?php
namespace Database\Seeders;
use App\Models\Notification;
use Illuminate\Database\Seeder;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Notification::factory(app()->isLocal() ? 15 : 5)->create();
    }
}
