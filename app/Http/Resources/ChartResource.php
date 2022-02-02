<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
                'label' => Carbon::parse($this->first()->created_at)->format('F Y'),
                'data' => [$this->sum('net_price')],
                'borderColor' => ['#aa1414', '#22cae8', '#b319c4'][rand(0, 2)],
                'backgroundColor' => ['#aa1414', '#22cae8', '#b319c4'][rand(0, 2)]
        ];
    }
}
