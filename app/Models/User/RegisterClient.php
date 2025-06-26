<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Order\Order;
class RegisterClient extends Model
{
    use HasUuids, SoftDeletes;
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
