<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use \Illuminate\Support\Str;

class ProductExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'name' => ucfirst($this->name),
            'name_ar' => ucfirst($this->name_ar),
            'name_en' => ucfirst($this->name_en),
            'caption_ar' => ucfirst($this->name_ar),
            'caption_en' => ucfirst($this->name_en),
            'on_new' => $this->on_new,
            'exclusive' => $this->exclusive,
            'isOnSale' => $this->isOnSale,
            'finalPrice' => $this->finalPrice,
            'imageThumb' => $this->imageThumb,
            'isReallyHot' => $this->isReallyHot,
            'hasStock' => $this->hasStock,
            'type' => $this->type
        ];
    }
}
