<?php

namespace App\Http\Requests\Backend;

use Illuminate\Foundation\Http\FormRequest;

class ServiceUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'image.dimensions' => trans('message.best_fit', ['width' => '1080 px', 'height' => '1440 px']),
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sku' => 'nullable|min:2',
            'name_ar' => 'required:min:3|max:200',
            'name_en' => 'required|min:3|max:200',
            'user_id' => 'required|exists:users,id',
            'image' => 'image|nullable|dimensions:width=1080,height=1440|max:300',
            'categories' => 'required|array',
            'price' => 'required|numeric|min:0.5|max:999',
            'start_date' => 'required',
            'end_date' => 'required',
            'range' => 'nullable',
            'on_sale' => 'boolean',
            'on_sale_on_homepage' => 'boolean',
            'on_homepage' => 'boolean',
            'sale_price' => 'numeric|nullable|min:0.5|max:999',
            'size_chart_image' => 'image|nullable',
            'description_en' => 'min:3|nullable',
            'description_ar' => 'min:3|nullable',
            'notes_ar' => 'min:3|nullable',
            'notes_en' => 'min:3|nullable',
            'active' => 'required|boolean',
            'tags' => 'array',
            'videos' => 'array',
            'video_url' => 'nullable|url',
            'video_url_one' => 'nullable|url',
            'video_url_two' => 'nullable|url',
        ];
    }
}
