<?php

namespace App\Models;

class Coupon extends PrimaryModel
{
    protected $dates = ['created_at', 'updated_at','due_date'];
    protected $guarded = [''];
    protected $casts = [
        'is_percentage' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
