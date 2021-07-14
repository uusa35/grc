<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonPeriod;

class Timing extends PrimaryModel
{
    protected $dates = ['created_at', 'updated_at'];
    protected $localeStrings = ['notes', 'day_name'];
    protected $appends = ['start_time', 'end_time'];
    protected $guarded = [''];
    protected $casts = [
        'is_off' => 'boolean',
        'is_available' => 'boolean',
        'active' => 'boolean',
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

    // timing can be attached to multi services if only enable_global_service is true
    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_timing');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeWorkingDays($q)
    {
        return $q->where(['is_off' => false])->whereTime('start', '>=', '06:00:01')->whereTime('start', '<=', '23:59:59')->whereTime('end', '<=', '23:59:59');
    }

    public function scopeOffDays($q)
    {
        return $q->where(['is_off' => true]);
    }

//    public function scopeValidTimings($q) {
//        return $q->where('start','>', Carbon::now('Asia/Kuwait')->format('H'));
//    }

//    public function scopeNotToday($q) {
//        dd(Carbon::now()->format('OD'));
//        return $q->where('day','>', Carbon::now('Asia/Kuwait')->format('H'));
//    }

    public function getStartDutyAttribute()
    {
        return Carbon::parse($this->start)->format('g:ia');
    }

    public function getEndDutyAttribute()
    {
        return Carbon::parse($this->end)->format('g:ia');
    }

    public function getStartTimeAttribute()
    {
        return Carbon::parse($this->start)->format('h:i a');
    }

    public function getEndTimeAttribute()
    {
        return Carbon::parse($this->end)->format('h:i a');
    }

    public function getCurrentDateAttribute($currentDate = null, $weeks = null)
    {
        if($currentDate && $weeks) {
            return Carbon::parse($currentDate)->addWeeks($weeks)->format('d/m/Y');
        } else {
            return Carbon::now()->format('l') === $this->day ? Carbon::parse($this->day)->addWeek()->format('d/m/Y') : Carbon::parse($this->day)->format('d/m/Y');
        }
    }

    public function getTodayAttribute()
    {
        if (!env('seeding')) {
            return Carbon::now()->format('l') === $this->day ? Carbon::parse($this->day)->addWeek()->format('d/m/Y') : Carbon::parse($this->day)->format('d/m/Y');
        }
    }
}
