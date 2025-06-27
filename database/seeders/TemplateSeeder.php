<?php

namespace Database\Seeders;

use App\Models\Order\InvitationTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'template_name' => 'Template 1',
                'description' => 'Description 1',
                'slug' => 'template-1',
                'preview_url' => 'https://example.com/template1',
                'folder_path' => 'path/to/folder1',
                'type' => 'syukuran',
                'is_active' => true,
                'price' => 200,
                'isDiscount' => false,
                'priceDiscount' => null
            ]
        ];

        foreach($data as $template){
            InvitationTemplate::create($template);
        }
    }
}
