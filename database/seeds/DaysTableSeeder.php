<?php

use App\Models\Day;
use Illuminate\Database\Seeder;

class DaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $days_ar = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        foreach ($days as $n => $v) {
            factory(Day::class)->create([
                'day' => $v,
                'day_name_en' => $v,
                'day_name_ar' => $days_ar[$n],
                'day_no' => $n
            ]);
        }
    }
}
