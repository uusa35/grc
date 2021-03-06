<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Product extends PrimaryModel
{
    use HasFactory, ProductHelpers, SellingModelHelpers, SoftDeletes, HasEvents;
    protected $guarded = [''];
    protected $dates = ['created_at', 'deleted_at', 'start_sale', 'end_sale'];
    protected $casts = [
        'qty' => 'integer',
        'price' => 'float',
        'sale_price' => 'float',
        'has_attributes' => 'boolean',
        'show_attribute' => 'boolean',
        'direct_purchase' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product_attributes()
    {
        // prodct A
        // has Small / Red / 3
        // has X-Lage / Green / 10
        // Product B has Only One Single Attribute == 10
        return $this->hasMany(ProductAttribute::class);
    }

    public function order_metas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }

    public function shipment_package()
    {
        return $this->belongsTo(ShipmentPackage::class);
    }

    // in case product does not have Attribute --> it has only one size or one color
    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function ordermetas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }


    public function alerts()
    {
        return $this->morphMany(Alert::class, 'alertable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }

    public function userGroup()
    {
        return $this->belongsToMany(User::class, 'product_user');
    }

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'ratingable');
    }
}
