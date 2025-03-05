<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionMovie extends Model
{
    protected $fillable = [
        'imdb', 'title', 'time', 'seats'
    ];
}
