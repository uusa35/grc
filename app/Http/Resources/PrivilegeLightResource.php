<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrivilegeLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'index' => $this->pivot->index,
            'main_menu' => $this->main_menu,
            'is_sub_module' => $this->is_sub_module,
            'image' => $this->image,
        ];
    }
}
