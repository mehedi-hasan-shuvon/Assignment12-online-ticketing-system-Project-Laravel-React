<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['from_location_id', 'to_location_id', 'trip_date', 'departure_time', 'arrival_time', 'fare', 'user_id', 'allocation_id'];
}
