<?php

namespace App\Exports;

use App\Http\Resources\ProductExtraLightResource;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;

class ProductsExport implements  FromQuery, WithMapping, WithHeadings, WithEvents, ShouldAutoSize
{
    public $elements;

    public function __construct($elements)
    {
        $this->elements = $elements;
    }

    public function headings(): array
    {
        return [
            '#',
            'name_ar',
            'name_en',
            'price',
            'sale_price',
            'description_ar',
            'description_en',
            'user',
            'qty'

        ];
    }

    public function map($element): array
    {
        return [
            $element->id,
            $element->name_ar,
            $element->name_en,
            $element->price,
            $element->price,
            $element->user->name_en,
            $element->qty,
        ];
    }

    public function query()
    {
        return $this->elements;
    }

    public function columnWidths(): array
    {
        return [
            'B' => 25,
            'C' => 25,
            'D' => 25,
            'E' => 25,
            'F' => 25,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getDelegate()->getPageSetup()->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
            }
        ];
    }
}
