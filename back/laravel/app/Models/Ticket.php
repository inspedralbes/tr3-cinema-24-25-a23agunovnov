<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'ID_user', 'ID_session', 'sala', 'seats', 'total'
    ];
}
