<?php

namespace App\Models;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SeatAllocation extends Model
{
    use HasFactory;

    protected $fillable = ['trip_id', 'seat_number', 'status','user_id', 'created_by', 'updated_by'];

    function trip(){

        return $this->belongsTo(Trip::class, 'trip_id');


    }

    
}
