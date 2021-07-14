<?php

namespace App\Models;


class Setting extends PrimaryModel
{
    use ModelHelpers;
    protected $localeStrings = ['address', 'country', 'company', 'description', 'shipment_notes', 'policy', 'terms'];
    protected $guarded = [''];
    protected $casts = [
        'show_commercials' => 'boolean',
        'splash_on' => 'boolean',
        'cash_on_delivery' => 'boolean',
        'multi_cart_merchant' => 'boolean',
        'pickup_from_branch' => 'boolean',
        'shipment_fixed_rate' => 'boolean'
    ];

    public function getLogoLargeAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('large') . $this->logo : asset(env('LARGE') . $this->logo);
    }

    public function getLogoThumbAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('thumbnail') . $this->logo : asset(env('THUMBNAIL') . $this->logo);
    }

    public function getLogoAppThumbAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('thumbnail') . $this->app_logo : asset(env('THUMBNAIL') . $this->app_logo);
    }

    public function getSizeChartImageAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('large') . $this->size_chart : asset(env('LARGE') . $this->size_chart);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function getFullWhatsappAttribute()
    {
        return '965'.numToEn($this->whatsapp);
    }
}
