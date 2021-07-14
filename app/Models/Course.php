<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends PrimaryModel
{
    use HasFactory;
    protected $dates = ['created_at', 'deleted_at', 'start_sale', 'end_sale'];
    protected $localeStrings = ['name', 'description', 'notes'];
    protected $guarded = [''];
    protected $casts = [
        'on_sale' => 'boolean',
        'on_home' => 'boolean',
        'active' => 'boolean',
        'home_delivery_availability' => 'boolean',
        'is_available' => 'boolean',
        'has_attributes' => 'boolean',
        'show_attribute' => 'boolean',
        'is_hot_deal' => 'boolean',
        'exclusive' => 'boolean',
        'on_new' => 'boolean',
        'direct_purchase' => 'boolean',
        'tailor_measurement_service' => 'boolean',
        'weight' => 'float',
        'price' => 'float',
        'wrap_as_gift' => 'boolean',
        'direct_purchase' => 'boolean',
        'show_size_chart' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites', 'product_id');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
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
        return $this->hasMany(Rating::class);
    }

}
