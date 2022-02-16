<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'caption_ar' => $this->caption_ar,
            'caption_en' => $this->caption_en,
            'notes_ar' => $this->notes_ar,
            'notes_en' => $this->notes_en,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'image' => $this->image,
            'size_chart_image' => $this->size_chart_image,
            'show_size_chart' => $this->show_size_chart,
            'sku' => $this->sku,
            'on_new' => $this->on_new,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'free' => $this->free,
            'download' => $this->download,
            'embedded' => $this->embedded,
            'file' => $this->file,
            'is_available' => $this->is_available,
            'video_url_one' => $this->video_url_one,
            'has_attributes' => $this->has_attributes && $this->product_attributes->isNotEmpty(),
            'show_attribute' => $this->show_attribute,
            'direct_purchase' => $this->direct_purchase,
            'qty' => $this->qty,
            'user' => UserLightResource::make($this->whenLoaded('user')),
            'color' => ColorExtraLightResource::make($this->whenLoaded('color')),
            'size' => SizeExtraLightResource::make($this->whenLoaded('size')),
            'product_attributes' => ProductAttributeResource::collection($this->whenLoaded('product_attributes')),
            'images' => ImageLightResource::collection($this->whenLoaded('images')),
            'categories' => CategoryExtraLightResource::collection($this->whenLoaded('categories')),
        ];
    }
}
