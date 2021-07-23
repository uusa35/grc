<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Color extends PrimaryModel
{
    use HasFactory;
    protected $localeStrings = ['name'];
    protected $guarded = [''];
    protected $appends = ['name'];


    public function product_attribute()
    {
        return $this->hasOne(ProductAttribute::class);
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'product_attributes', 'product_id', 'color_id');
    }


    // only the case which product has color_id / size_id (One Attribute Only included in table)
    public function singleProducts() {
        return $this->hasMany(Product::class);
    }
}
