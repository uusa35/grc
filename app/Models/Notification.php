<?php

namespace App\Models;

class Notification extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];

    // Product / Service / User
    public function notificationable()
    {
        return $this->morphTo();
    }
}
