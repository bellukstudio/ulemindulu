<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\RegisterClient;
use App\Models\Packet\Packet;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasUuids,SoftDeletes;

    protected $fillable = [
        'client_id',
        'payment_status',
        'midtrans_order_id',
        'order_date',
        'invitation_template_id',
        'subdomain',
        'template_data',
    ];

    protected $dates = ['deleted_at'];

    public function client()
    {
        return $this->belongsTo(RegisterClient::class);
    }



    public function template()
    {
        return $this->belongsTo(InvitationTemplate::class);
    }
}
