<?php

namespace App\Models;


use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAttribute extends PrimaryModel
{
    use SoftDeletes;
    protected $guarded = [''];
    protected $localeStrings = ['notes'];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function getSizeNameAttribute()
    {
        return $this->size->name;
    }

    public function getColorNameAttribute()
    {
        return $this->color->name;
    }

    public function order_meta()
    {
        return $this->hasMany(OrderMeta::class);
    }
}
