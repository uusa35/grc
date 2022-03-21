<?php

namespace App\Imports;

use App\Models\Product;
use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductsImport implements ToCollection
{

    public $userId;
    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if($row[0] !== '#') {
                Product::create([
                    'name_ar' => $row[1],
                    'name_en' => $row[2],
                    'price' => (float) $row[3],
                    'sale_price' => (float) $row[3],
                    'description_ar' => (float) $row[4],
                    'description_en' => (float) $row[5],
                    'user_id' => (integer) $this->userId,
                    'image' => 'product.png',
                    'sku' => rand(111,999),
                    'qty' => [6 ],
                    'weight' => '0.1',
                ]);
            }
        }
    }
}
