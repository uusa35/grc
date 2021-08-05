<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Timing extends PrimaryModel
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at'];
    protected $localeStrings = ['notes'];
//    protected $with = ['day'];
    protected $guarded = [''];
    protected $casts = [
        'allow_multi_select' => 'boolean'
    ];

    public function days()
    {
        return $this->belongsTo(Day::class);
    }

    // timing can be attached to only one service if enable_global_service is false
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
