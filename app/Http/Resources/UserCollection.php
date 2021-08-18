<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(fn($element) => [
            'id' => $element->id,
            'name_ar' => $element->name_ar,
            'name_en' => $element->name_en,
            'image' => $element->image,
            'created_at' => $element->created_at,
        ]);
    }
}
