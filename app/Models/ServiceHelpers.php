<?php
/**
 * Created by PhpStorm.
 * User: usama
 * Date: 2019-03-11
 * Time: 14:00
 */

namespace App\Models;


use Carbon\Carbon;

trait ServiceHelpers
{
    public function scopeServeCountries($q)
    {
        return $q->whereHas('user', function ($q) {
            $q->where(['country_id' => getCurrentCountrySessionId()]);
        });

    }

    public function scopeHasValidTimings($q)
    {
            return $q->whereHas('timings', function ($q) {
                return $q->active()->workingDays();
            },'>',0)->where('end_date' ,'>=' , Carbon::today());
    }
}
