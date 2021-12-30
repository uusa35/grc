<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductAttributeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'price' => $this->price,
            'color_id' => $this->color_id,
            'size_id' => $this->size_id,
            'qty' => $this->qty,
            'color' => ColorExtraLightResource::make($this->whenLoaded('color')),
            'size' => SizeExtraLightResource::make($this->whenLoaded('size')),
        ];
    }
}
