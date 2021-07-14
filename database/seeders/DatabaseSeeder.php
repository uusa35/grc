<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Image;
use App\Models\Menu;
use App\Models\Message;
use App\Models\Page;
use App\Models\Section;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(10)->create()->each(function ($q) {
             if($q->id === 1) {
                 $q->update(['email' => 'admin@admin.com', 'is_admin' => true ]);
             }
         });
         Template::factory(3)->create(); // for sections
         Page::factory(10)->create()->each(function ($q) {
             $q->images()->saveMany(Image::factory(10)->create());
             $q->slides()->saveMany(Slide::factory(10)->create());
             $q->sections()->saveMany(Section::factory(10)->create());
         });
        Service::factory(10)->create()->each(function ($q) {
            $q->images()->saveMany(Image::factory(10)->create());
            $q->slides()->saveMany(Slide::factory(10)->create());
            $q->sections()->saveMany(Section::factory(10)->create());
        });
         Faq::factory(10)->create();
         Menu::factory(10)->create();
         Message::factory(20)->create();
         Setting::factory(1)->create()->each(function ($q) {
             $q->images()->saveMany(Image::factory(10)->create());
         });
    }
}
