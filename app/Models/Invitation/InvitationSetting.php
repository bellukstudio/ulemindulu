<?php

namespace App\Models\Invitation;

use App\Models\Order\InvitationTemplate;
use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class InvitationSetting extends Model
{
    use HasUuids;

    protected $fillable = [
        'description',
        'order_id',
        'invitation_template_id',
        'event_date',
        'event_time',
        'timezone',
        'address',
        'location',
        'backsound',
        'custom_data',
    ];


    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function invitationTemplate(){
        return $this->belongsTo(InvitationTemplate::class);
    }
}
