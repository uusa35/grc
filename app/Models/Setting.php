<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];

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

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }
}
