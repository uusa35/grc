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

    public function timing()
    {
        return $this->belongsTo(Timing::class);
    }

    public function product_attribute()
    {
        return $this->belongsTo(ProductAttribute::class, 'product_attribute_id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'destination_id');
    }

    public function merchant()
    {
        return $this->belongsTo(User::class, 'merchant_id');
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }
}
