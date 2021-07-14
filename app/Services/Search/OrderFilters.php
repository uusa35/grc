<?php

namespace App\Services\Search;

use App\Http\Resources\CategoryLightResource;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 2/7/17
 * Time: 8:40 AM
 */
class OrderFilters extends QueryFilters
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    public function search($search)
    {
        return $this->builder
            ->where('name_ar', 'like', "%{$search}%")
            ->orWhere('name_en', 'like', "%{$search}%")
            ->orWhere('description_ar', 'like', "%{$search}%")
            ->orWhere('description_en', 'like', "%{$search}%");
    }

    public function paid()
    {
        return $this->builder->where(['paid' => request()->paid]);
    }

    public function cash_on_delivery()
    {
        return $this->builder->where(['cash_on_delivery' => true]);
    }

    public function payment_method()
    {
        return $this->builder->where(['paid' => true, 'cash_on_delivery' => false]);
    }


}
