<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class CategoriesImport implements ToCollection
{
    public function __construct()
    {
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if ($row[0] !== '#' && !is_null($row[0])) {
                Category::create([
                    'name' => $row[2],
                    'name_ar' => $row[1],
                    'name_en' => $row[2],
                    'description_ar' => (string)$row[3],
                    'description_en' => (string)$row[4],
                    'caption_ar' => (string)$row[3],
                    'caption_en' => (string)$row[4],
                    'parent_id' => $row[5] ? $row[5] : 0,
                    'order' => $row[6],
                    'is_parent' => $row[7] ? $row[7] : 0,
                    'is_product' => $row[7],
                    'is_user' => $row[7],
                    'is_book' => $row[7],
                    'is_market' => $row[7],
                    'image' => $row[8] ? $row[8] : 'square.png',
                    'image_rectangle' => $row[8] ? $row[8] : 'square.png',
                ]);
            }
        }
    }
}
