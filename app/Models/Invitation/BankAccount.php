<?php

namespace App\Models\Invitation;

use App\Models\Order\InvitationTemplate;
use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
class BankAccount extends Model
{
    use HasUuids;

    protected $fillable = [
        'order_id',
        'invitation_template_id',
        'bank_name',
        'account_number',
        'receiver_name',
    ];
    

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function invitationTemplate()
    {
        return $this->belongsTo(InvitationTemplate::class);
    }
}
