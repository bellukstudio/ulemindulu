<?php

namespace App\Models\Order;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvitationTemplate extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'template_name',
        'description',
        'slug',
        'preview_url',
        'folder_path',
        'thumbnail',
        'thumbnail_public_id',
        'type',
        'is_active',
        'price',
        'isDiscount',
        'priceDiscount',
        'order_count'
    ];

    protected $dates = ['deleted_at'];

    protected $casts = [
        'is_active' => 'boolean',
        'isDiscount' => 'boolean',
        'price' => 'decimal:2',
        'priceDiscount' => 'decimal:2',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'invitation_template_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('template_name', 'like', '%' . $search . '%');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('d F Y');
    }
}
