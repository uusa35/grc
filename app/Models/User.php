<?php

namespace App\Models;

use App\Services\Traits\LocaleTrait;
use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, ModelHelpers, UserHelpers, SoftDeletes, HasEvents;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [''];
//    protected $localeStrings = ['name', 'description', 'service', 'policy', 'address', 'caption'];
    protected $dates = ['created_at', 'deleted_at',  'end_subscription_date'];
//    protected $appends = ['address', 'name', 'description'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token','api_token'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function books()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function areas()
    {
        return $this->belongsTo(Area::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function governate()
    {
        return $this->belongsTo(Governate::class);
    }

    public function coupons()
    {
        return $this->hasMany(Coupon::class);
    }

    public function product_favorites()
    {
        return $this->belongsToMany(Product::class, 'favorites');
    }

    public function service_favorites()
    {
        return $this->belongsToMany(Service::class, 'favorites');
    }

    public function fans()
    {
        return $this->belongsToMany(User::class, 'fans', 'fan_id');
    }

    public function myFannedList()
    {
        return $this->belongsToMany(User::class, 'fans', 'user_id', 'fan_id');
    }

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
        return $this->morphToMany(Video::class, 'videoable');
    }

    public function notificationAlerts()
    {
        return $this->morphMany(Notification::class, 'notificationable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function ratings()
    {
        return $this->belongsTo(Rating::class);
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }


    public function productGroup()
    {
        return $this->belongsToMany(Product::class, 'product_user');
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

    public function ownComments()
    {
        return $this->hasMany(Comment::class);
    }

    public function surveys()
    {
        return $this->belongsToMany(Survey::class, 'survey_user');
    }

    public function questionnaires()
    {
        return $this->hasMany(Questionnaire::class, 'client_id');
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function localArea()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
