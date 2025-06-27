<?php

namespace App\Models\Order;

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
        'type',
        'is_active',
        'price',
        'isDiscount',
        'priceDiscount'
    ];
    protected $dates = ['deleted_at'];


    public function orders()
    {
        return $this->hasMany(Order::class);
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
}
