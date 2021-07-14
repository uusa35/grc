<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends PrimaryModel
{
    protected $guarded = [''];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function member()
    {
        return $this->hasOne(User::class, 'member_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product()
    {
        return $this->hasOne(Product::class, 'product_id');
    }
}
