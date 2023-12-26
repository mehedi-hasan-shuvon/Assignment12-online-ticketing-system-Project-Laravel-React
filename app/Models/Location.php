<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['location_name', 'location_id'];

    //only accesse the name and id
    protected $visible = ['location_name', 'location_id'];


}
