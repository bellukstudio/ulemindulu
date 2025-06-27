<?php

namespace App\Models\Packet;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Packet extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = [
        'packetName',
        'feature',
        'price',
        'isDiscount',
        'priceDiscount',
    ];
    protected $dates = ['deleted_at'];
}
