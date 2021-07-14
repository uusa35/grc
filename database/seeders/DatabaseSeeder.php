<?php

namespace Database\Seeders;

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
//         User::factory(10)->create()->each(function ($q) {
//             if($q->id === 1) {
//                 $q->update(['email' => 'admin@admin.com', 'is_admin' => true ]);
//             }
//         });
//         Template::factory(3)->create(); // for sections
//         Page::factory(10)->create()->each(function ($q) {
//             $q->images()->saveMany(Image::factory(10)->create());
//             $q->slides()->saveMany(Slide::factory(10)->create());
//             $q->sections()->saveMany(Section::factory(10)->create());
//         });
//        Service::factory(10)->create()->each(function ($q) {
//            $q->images()->saveMany(Image::factory(10)->create());
//            $q->slides()->saveMany(Slide::factory(10)->create());
//            $q->sections()->saveMany(Section::factory(10)->create());
//        });
//         Faq::factory(10)->create();
//         Menu::factory(10)->create();
//         Message::factory(20)->create();
//         Setting::factory(1)->create()->each(function ($q) {
//             $q->images()->saveMany(Image::factory(10)->create());
//         });


        $this->call(CountriesTableSeeder::class);
        $this->call(GovernatesTableSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(DaysTableSeeder::class);
        $this->call(PrivilegesTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(CurrenciesTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(ColorsTableSeeder::class);
        $this->call(SizesTableSeeder::class);
        $this->call(PagesTableSeeder::class);
        $this->call(NewslettersTableSeeder::class);
        $this->call(NotificationsTableSeeder::class);
        $this->call(BrandsTableSeeder::class);

        $this->call(UsersTableSeeder::class);
        $this->call(ShippmentPackgesTableSeeder::class);
        $this->call(CommercialsTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(VideosTableSeeder::class);
        $this->call(BranchesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(BooksTableSeeder::class);
        $this->call(CoursesTableSeeder::class);
        $this->call(ServicesTableSeeder::class);
        $this->call(TimingsTableSeeder::class);
        $this->call(SlidesTableSeeder::class);
        $this->call(CouponsTableSeeder::class);
        $this->call(OrdersTableSeeder::class);;
        $this->call(FavoritesTableSeeder::class);
        $this->call(RatingsTableSeeder::class);
        $this->call(FansTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(AddressesTableSeeder::class);
    }
}
