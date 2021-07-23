<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdate extends FormRequest
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
            'qr.dimensions' => trans('message.best_fit', ['width' => '300 px', 'height' => '300 px']),
            'size_chart.dimensions' => trans('message.best_fit', ['width' => '1080 px', 'height' => '1440 px']),
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
            'sku' => 'required|min:2',
            'name_ar' => 'required:min:3|max:200',
            'name_en' => 'required|min:3|max:200',
            'has_attributes' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'shipment_package_id' => 'nullable|exists:shipment_packages,id',
            'brand_id' => 'nullable|exists:brands,id',
            'image' => "image|nullable|dimensions:width=1080,height=1440|max:".env('MAX_IMAGE_SIZE').'"',
            'qr' => "image|nullable|dimensions:width=300,height=300|max:".env('MAX_IMAGE_SIZE').'"',
            'categories' => 'required|array',
            'price' => 'required|numeric|min:0.5|max:999',
            'qty' => ['required', 'numeric', 'min:1', 'max:999', 'regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/'],
//            'weight' => ['required','numeric','min:0.1','max:10','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/'],
            'weight' => ['required','between:0.1,10'],
            'order' => ['numeric','min:1','max:9999','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/', 'nullable'],
            'on_sale' => 'boolean',
            'on_sale_on_homepage' => 'boolean',
            'on_homepage' => 'boolean',
            'sale_price' => 'numeric|nullable|min:0.5|max:999',
            'size_chart_image' => 'image|nullable',
            'description_en' => 'min:3|nullable',
            'description_ar' => 'min:3|nullable',
            'notes_ar' => 'min:3|nullable',
            'notes_en' => 'min:3|nullable',
            'size_chart_image' => 'nullable|image|dimensions:width=1080,height=1440',
//            'start_sale' => 'date|nullable',
//            'end_sale' => 'required',
            'active' => 'required|boolean',
            'tags' => 'array',
            'videos' => 'array',
            'video_url' => 'nullable|url',
            'video_url_one' => 'nullable|url',
            'video_url_two' => 'nullable|url',
            'color_id' => 'nullable|exists:colors,id|required_unless:has_attributes,1',
            'size_id' => 'nullable|exists:sizes,id|required_unless:has_attributes,1',
            'home_delivery_availability' => 'nullable|boolean'
        ];
    }
}
