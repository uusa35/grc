<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductAttribute extends PrimaryModel
{
    use HasFactory,SoftDeletes;
    protected $guarded = [''];
    protected $localeStrings = ['notes'];
    protected $with = ['color','size'];

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
