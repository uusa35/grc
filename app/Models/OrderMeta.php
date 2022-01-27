<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class OrderMeta extends PrimaryModel
{
    use HasFactory, SoftDeletes;

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

    public function product_attribute()
    {
        return $this->belongsTo(ProductAttribute::class, 'attribute_id');
    }

    public function getTypeAttribute()
    {
        return strtolower(class_basename($this->ordermetable_type));
    }
}
