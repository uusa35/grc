<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends PrimaryModel
{
    use HasFactory;
    protected $localeStrings = ['name','caption','address', 'country', 'description', 'shipment_notes', 'policy', 'terms'];
    protected $guarded = [''];
    protected $appends = ['name','caption','country','address','description','sizeChartImage','imageThumb'];

    public function getSizeChartImageAttribute()
    {
        return asset(env('LARGE') . $this->size_chart);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function getFullWhatsappAttribute()
    {
        return '965'.numToEn($this->whatsapp);
    }

    public function getCountryAttribute() {
        return $this->country;
    }

    public function getAddressAttribute() {
        return $this->address;
    }
}
