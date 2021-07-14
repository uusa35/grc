<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];

    // Product / Service / User
    public function notificationable()
    {
        return $this->morphTo();
    }
}
