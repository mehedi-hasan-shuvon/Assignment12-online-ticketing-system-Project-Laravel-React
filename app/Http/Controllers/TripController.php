<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Models\SeatAllocation;
use Illuminate\Support\Facades\DB;


class TripController extends Controller
{
    //

    function ticketSearch(Request $request){

        $tripType = $request->tripType;
        $date = $request->date;



        // find the trip along with seat allocation

        $result = Trip::where('trip_status', $tripType)
                    ->where('trip_date', $date)
                    ->with('ticketSearch')
                    ->get();


        
        return $result;
 

    }



    function seatSearch(Request $request){

        $userId = $request->id;

        $seatNumber = $request->seatNumber;
        $tripId = $request->tripId;

        //check the seat is available or not

        $isSeatBooked = SeatAllocation::where('trip_id', $tripId)->where('seat_number', $seatNumber)->whereNot('status', 'available')->get();





        if(count($isSeatBooked) > 0){
            return 0;
        }else{

            //update or insert seat allocation

            SeatAllocation::updateOrCreate(
                [
                    'trip_id' => $tripId,
                    'seat_number' => $seatNumber
                ],
                [
                    'status' => 'hold',
                    'user_id' => $userId
                ]
            );






            return 1;
        }




        
    }


    function seatBooking(Request $request){

        $userId = $request->id;

        


        $data = $request->all();

        $tripId= $data['trip_id'];
        $seatNumber = $data['seat_number'];

        //get the seat 

        $seat = SeatAllocation::where('trip_id', $tripId)->where('user_id', $userId)->where('seat_number', $seatNumber)->get();


        SeatAllocation::where('trip_id', $tripId)->where('user_id', $userId)->where('seat_number', $seatNumber)->update(['status' => 'booked', 'user_id' => $userId]);


        // add to booking table
        Booking::create([
            'from_location_id' => $data['from'],
            'to_location_id' => $data['to'],
            'trip_date' => $data['trip_date'],
            'departure_time' => $data['departure_time'],
            'arrival_time' => $data['arrival_time'],
            'fare' => $data['fare'],
            'user_id' => $userId,
            'allocation_id' => $seat[0]->id
        ]);

        return response()->json( ['message' => 'booking completed successfully'], 200 );
        
    }
}

