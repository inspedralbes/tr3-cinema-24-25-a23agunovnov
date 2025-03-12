<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    protected $fillable = [
        'ID_user', 'ID_session', 'sala', 'seats', 'total'
    ];

    public function sessions(): BelongsTo
    {
        return $this->belongsTo(Ticket::class, 'ID_session', 'id');
    }
}
