<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;

class InvitationTemplate extends Model
{
    protected $fillable = [
        "template_name",
        "description",
        "slug",
        "preview_url",
        "folder_path",
        "type",
        "is_active",
    ];

    protected $dates = ['deleted_at'];
}
