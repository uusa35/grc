<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class OrderMeta extends PrimaryModel
{
    use HasFactory;

    protected $guarded = [''];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function ordermetable()
    {
        return $this->morphTo();
    }

    public function merchant()
    {
        return $this->belongsTo(User::class, 'merchant_id');
    }

}
