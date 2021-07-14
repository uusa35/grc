<?php

namespace App\Models;


class Day extends PrimaryModel
{
    protected $localeStrings = ['day_name'];

    public function timings() {
        return $this->hasMany(Timing::class);
    }
}
