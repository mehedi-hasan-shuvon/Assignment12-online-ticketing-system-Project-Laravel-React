<?php

namespace App\Models;

use App\Models\SeatAllocation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Trip extends Model
{
    use HasFactory;

    function ticketSearch(){

        return $this->hasMany(SeatAllocation::class, 'trip_id');
    }
}
