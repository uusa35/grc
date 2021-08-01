<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends PrimaryModel
{
    use HasFactory, SoftDeletes, SellingModelHelpers, ServiceHelpers;
    protected $localeStrings = ['name', 'description', 'notes'];
    protected $guarded = [''];
    protected $appends = ['name','description'];
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
        return $this->morphToMany(Category::class, 'categoryable');
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

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function ordermetas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }

}
