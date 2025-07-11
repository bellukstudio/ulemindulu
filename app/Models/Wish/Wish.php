<?php

namespace App\Models\Wish;

use App\Models\Order\InvitationTemplate;
use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Wish extends Model
{
    use HasUuids;

    protected $fillable = [
        'order_id',
        'invitation_template_id',
        'present',
        'name',
        'saying',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function template()
    {
        return $this->belongsTo(InvitationTemplate::class);
    }
}
