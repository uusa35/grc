<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'image' => $this->image,
            'role' => RoleExtraLightResource::make($this->whenLoaded('role')),
            'favoritesList' => FavoriteExtraLightResource::collection($this->whenLoaded('favoritesList')),
            'orders' => OrderExtraLightResource::collection($this->whenLoaded('orders')),
            'country' => CountryExtraLightResource::make($this->whenLoaded('country')),
        ];
    }
}
