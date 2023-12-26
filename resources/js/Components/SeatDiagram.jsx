import React, { useEffect, useState } from 'react';
import SeatAddModal from './SeatAddModal';

const SeatDiagram = ({ auth, tripDetails, locationList, formData }) => {
    const [seatList, setSeatList] = useState(tripDetails?.ticket_search);

    // const [isSelectedSeatFree, setIsSelectedSeatFree] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSeatNumber, setSelectedSeatNumber] = useState(null);

    useEffect(() => {
        setSeatList(tripDetails?.ticket_search);
    }, [tripDetails]);

    const handleSeatClick = (seatNumber) => {

        handleSeatSelectionSearch(seatNumber);
    };

    const handleSeatSelectionSearch = async (seatNumber) => {

        try {
            const response = await axios.get(`/api/seatSearch/${auth?.user?.id}`, {
                params: {
                    seatNumber: seatNumber,
                    tripId: tripDetails?.id
                }
            });

            if(response?.data == 1) {
                // setIsSelectedSeatFree(true);
                setShowAddModal(true);
                setSelectedSeatNumber(seatNumber);
                
            }else{
                // setIsSelectedSeatFree(false);
            }

        } catch (error) {
            console.error('Error fetching locations:', error);
        }
        
    }

    const handleAddBooking = async (data) => {
        try{

            const response = await axios.post(`/api/seatBooking/${auth?.user?.id}`, data);
            console.log(response);

            if(response.status = 200 ){
                setShowAddModal(false);

            }

        }catch (error) {
            console.error('Error seat booking:', error);
        }
    }

    const generateSeatLabels = () => {
        const seats = [];
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // Example rows
        const numberOfSeatsPerRow = 4; // Number of seats per row
        const seatsPerGroup = 2; // Number of seats per group

        rows.forEach(row => {
            const rowSeats = []; // Store seats for each row
            for (let i = 1; i <= numberOfSeatsPerRow; i++) {
                const seatLabel = row + i;
                const isBooked = seatList.some(seat => seat.seat_number === seatLabel && seat.status === 'booked');
                const isHold = seatList.some(seat => seat.seat_number === seatLabel && seat.status === 'hold');
                const isFree = !isBooked && !isHold;

                rowSeats.push(
                    <div
                        key={seatLabel}
                        style={{
                            width: '50px',
                            height: '50px',
                            margin: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isBooked ? 'red' : isHold ? 'orange' : 'green', // Change color based on seat status
                            color: isBooked || isHold ? 'white' : 'black', // Text color based on seat status
                            borderRadius: '4px',
                            cursor: 'pointer' // Add cursor pointer to indicate clickable seats
                        }}
                        onClick={() => handleSeatClick(seatLabel)} // Attach click handler to each seat
                    >
                        {seatLabel}
                    </div>
                );

                if (i % seatsPerGroup === 0 && i !== numberOfSeatsPerRow) {
                    rowSeats.push(<div key={`${seatLabel}-spacer`} style={{ width: '20px' }} />); // Add a gap after every seatsPerGroup
                }
            }
            seats.push(
                <div key={row} style={{ display: 'flex', marginBottom: '10px' }}>
                    {rowSeats}
                </div>
            );
        });

        return seats;
    };

    return (
        <div className='flex justify-center'>
            <div>{generateSeatLabels()}</div>

           
             <SeatAddModal show={showAddModal} toggleModal={setShowAddModal} handelAddFunc={handleAddBooking} locationList={locationList} formData={formData} selectedSeatNumber={selectedSeatNumber} tripDetails = {tripDetails}/>
            
        </div>
    );
};

export default SeatDiagram;
