<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Order\Order;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class RegisterClient extends Model
{
    use HasUuids, SoftDeletes, HasApiTokens, Notifiable;
    protected $fillable = [
        'clientName',
        'email',
        'password'
    ];

    protected $dates = ['deleted_at'];
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
