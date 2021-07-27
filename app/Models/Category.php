<?php

namespace App\Models;

use App\Services\Search\QueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends PrimaryModel
{
    use HasFactory, SoftDeletes;
    protected $guarded = [''];
    public $localeStrings = ['name', 'caption', 'description'];
    public $appends = ['name', 'caption', 'description'];
//    protected $casts = [
//        'is_classified' => 'boolean',
//        'is_real_estate' => 'boolean',
//        'on_home' => 'boolean',
//        'on_new' => 'boolean',
//        'is_featured' => 'boolean',
//        'is_service' => 'boolean',
//        'is_product' => 'boolean',
//        'is_commercial' => 'boolean',
//        'is_user' => 'boolean',
//    ];

    /**
     * * ParentCategory
     * reverse
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * * ChildCategory
     * hasMany
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {

        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Category Product hasManyThrough ProductCategory
     * ManyToMany
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function services()
    {
        return $this->morphedByMany(Service::class, 'categoryable');
    }

    public function books()
    {
        return $this->morphedByMany(Book::class, 'categoryable');
    }

    public function courses()
    {
        return $this->morphedByMany(Course::class, 'categoryable');
    }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'categoryable','category_id','categoryable_id');
    }

    public function commercials()
    {
        return $this->morphedByMany(Commercial::class, 'categoryable');
    }

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function videos()
    {
        return $this->morphMany(Video::class, 'videoable');
    }

    // ManyToMay Morph
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function scopeOnlyParent($q)
    {
        return $q->where('is_parent', 1);
    }

    public function scopeOnlyChildren($q)
    {
        return $q->where('parent_id','!=', 0);
    }

    public function getIsParentAttribute()
    {
        return $this->parent_id === 0 ? true : false;
    }

    public function scopeOnlyForServices($q)
    {
        return $q->where('is_service', true);
    }

    public function scopeOnlyForProducts($q)
    {
        return $q->where('is_product', true);
    }

    public function scopeOnlyForCommercials($q)
    {
        return $q->where('is_product', true);
    }

    public function scopeOnlyForUsers($q)
    {
        return $q->where('is_user', true);
    }

    public function scopeOnlyForClassifieds($q)
    {
        return $q->where('is_classified', true);
    }

    public function scopeCategoryGroupsWithProperties($q)
    {
        return $q->with(['categoryGroups' => function ($q) {
            return $q->active()->has('properties', '>', 0)->with(['properties' => function ($q) {
                return $q->active()->orderBy('order', 'asc');
            }])->orderby('order', 'asc');
        }]);
    }

}
