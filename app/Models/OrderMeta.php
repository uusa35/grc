<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class OrderMeta extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function timing()
    {
        return $this->belongsTo(Timing::class);
    }

    public function product_attribute()
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'destination_id');
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function merchant()
    {
        return $this->belongsTo(User::class, 'merchant_id');
    }

    public function getIsProductTypeAttribute()
    {
        return strtolower($this->item_type) === 'product';
    }

    public function getIsServiceTypeAttribute()
    {
        return strtolower($this->item_type) === 'service';
    }

    public function getIsQuestionnaireTypeAttribute()
    {
        return strtolower($this->item_type) === 'questionnaire';
    }

    public function scopeBestSaleCollections($q)
    {
//        return $q->whereHas('collection' ,function ($q) {
//            return $q->active()->with(['user' => function ($q) {
//                return $q->active()->onHome()->whereHas('products' ,function ($q) {
//                    return $q->active();
//                });
//            }]);
//        },'>',0)
//            ->select(DB::raw('COUNT(*) as occurrences, collection_id'))
//            ->groupBy('collection_id')
//            ->orderBy('occurrences', 'DESC')
//            ->take(15)
//            ->get()
//            ->pluck('collection')->unique()->filter();
        return $q->with(['collection' => function ($q) {
            return $q->active()->whereHas('user', function ($q) {
                return $q->active();
            })->with(['user' => function ($q) {
                return $q->active()->with(['products' => function ($q) {
                    return $q->active()->available()->hasImage()->hasStock()->hasAtLeastOneCategory();
                }]);
            }]);
        }])
            ->select(DB::raw('COUNT(*) as occurrences, collection_id'))
            ->groupBy('collection_id')
            ->orderBy('occurrences', 'DESC')
            ->take(15)
            ->get()
            ->pluck('collection')->unique()->filter();
    }
}
