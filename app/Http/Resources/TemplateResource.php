<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'template_name' => $this->template_name,
            'description' => $this->description,
            'slug' => $this->slug,
            'preview_url' => $this->preview_url,
            'folder_path' => $this->folder_path,
            'thumbnail' => $this->thumbnail,
            'thumbnail_public_id' => $this->thumbnail_public_id,
            'is_active' => $this->is_active,
            'price' => $this->price,
            'isDiscount' => $this->isDiscount,
            'priceDiscount' => $this->priceDiscount
        ];
    }
}
