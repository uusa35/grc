<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends PrimaryModel
{
    use SoftDeletes, SellingModelHelpers, ServiceHelpers;
    protected $localeStrings = ['name', 'description', 'notes'];
    protected $guarded = [''];
    protected $appends = ['UId'];
    protected $dates = ['created_at', 'deleted_at', 'start_sale', 'end_sale'];
    protected $casts = [
        'on_sale' => 'boolean',
        'on_home' => 'boolean',
        'active' => 'boolean',
        'is_available' => 'boolean',
        'exclusive' => 'boolean',
        'is_hot_deal' => 'boolean',
        'enable_global_timings' => 'boolean',
        'has_only_items' => 'boolean',
        'is_package' => 'boolean',
        'has_addons' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function timings()
    {
        return $this->belongsToMany(Timing::class,'service_timing');
//        return $this->hasMany(Timing::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_service');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites', 'service_id');
    }

    public function fans()
    {
        return $this->belongsToMany(User::class, 'fans', 'service_id', 'fan_id');
    }

    // Many Morph
    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }


    public function areas()
    {
        return $this->belongsToMany(Area::class, 'area_service');
    }

    // Many Morph
    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notificationable');
    }

    // ManyToMay Morph
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    // ManyToMany Morph
    public function collections()
    {
        return $this->morphToMany(Collection::class, 'collectionable');
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

    public function order_meta()
    {
        return $this->hasMany(OrderMeta::class);
    }

    public function addons() {
        return $this->belongsToMany(Addon::class,'addon_service');
    }

    public function items() {
        return $this->belongsToMany(Item::class,'item_service');
    }
}
