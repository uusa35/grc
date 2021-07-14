<?php

namespace App\Models;

class Favorite extends PrimaryModel
{
    use ModelHelpers;
    protected $guarded = [''];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
