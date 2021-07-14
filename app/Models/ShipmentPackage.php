<?php

namespace App\Models;

class ShipmentPackage extends PrimaryModel
{
    protected $guarded = [''];
    protected $localeStrings = ['slug', 'notes'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function countries()
    {
        return $this->belongsToMany(Country::class);
    }


    public function getFinalPrice($totalWeight)
    {
        if($this->is_local) {
            return $this->charge;
        }
        $fuelPercentage = (float) Setting::first()->shipment_fuel_percentage;
        $totalWeight = (float)$totalWeight;
        if ($totalWeight < 0.5) {
            return round((float) $this->charge + ($this->charge * $fuelPercentage),2);
        } elseif ($totalWeight <= 1) {
            return round((float) $this->charge_one + ($this->charge_one * $fuelPercentage),2);
        } elseif ($totalWeight <= 1.5) {
            return round((float) $this->charge_two + ($this->charge_two * $fuelPercentage),2);
        } elseif ($totalWeight <= 2) {
            return round((float) $this->charge_three + ($this->charge_three * $fuelPercentage),2);
        } elseif ($totalWeight > 2) {
            return round((float) $this->charge_four + ($this->charge_four * $fuelPercentage),2);
        }
    }
}
