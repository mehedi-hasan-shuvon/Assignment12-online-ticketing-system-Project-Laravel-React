import moment from 'moment';
import React, { useState } from 'react'

const SeatAddModal = ({auth, show, toggleModal, handelAddFunc, locationList, formData, selectedSeatNumber, tripDetails }) => {



	const getLocationName = (locationId) => {
		const location = locationList.find((loc) => loc.location_id == locationId);

		return location ? location.location_name : '';
	}


	const calculatePrice = (from, to) => {

		const diff = parseInt(to) - parseInt(from);

		return Math.abs(diff) * 400;

	}

	const handleSeatAdd = () => {

		const data = {

			trip_id: tripDetails?.id,
			seat_number: selectedSeatNumber,
			from: formData.from,
			to: formData.to,
			trip_date: tripDetails?.trip_date,
			departure_time: tripDetails?.departure_time,
			arrival_time: tripDetails?.arrival_time,
			fare: calculatePrice(formData.from, formData.to),
			userId: auth?.user?.id
		}
		
		handelAddFunc(data);


		// toggleModal();
		
	}

	console.log(tripDetails);

	return (
		<>
			{show && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-white rounded-lg shadow-md overflow-hidden w-2/3">
						<div className="bg-gray-200 py-4 px-6 flex items-center justify-between">
							<h2 className="text-lg font-semibold">Confirm Seat</h2>
						</div>
						<div className="p-6">
							<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-12 gap-4 pb-5">

								<div className=" overflow-hidden col-span-6 py-3">

									{/* here i want a form to select from and to location from locationList */}
									<label htmlFor="fromLocation" className="block mb-2 font-semibold">From:</label>
									<select
										id="fromLocation"
										className="w-full border rounded-md p-2"
										// value={fromLocation}
										defaultValue={formData.from}
										disabled

									// onChange={(e) => setFromLocation(e.target.value)}
									>
										<option value="">Select Location</option>
										{locationList.map((location) => (
											<option key={location.location_id} value={location.location_id}>
												{location.location_name}
											</option>
										))}
									</select>

									<label htmlFor="toLocation" className="block mb-2 pt-5 font-semibold">To:</label>
									<select
										id="toLocation"
										className="w-full border rounded-md p-2"
										defaultValue={formData.to}
										disabled

									>
										<option value="">Select Location</option>
										{locationList.map((location) => (
											<option key={location.location_id} value={location.location_id}>
												{location.location_name}
											</option>
										))}
									</select>




								</div>


								<div className="bg-blue-100 overflow-hidden shadow-sm sm:rounded-lg col-span-6 p-4">
									<h1 className='text-xl font-bold text-center mb-4'>Seat Details</h1>

									<div className="flex flex-col">
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">From:</span><span>{getLocationName(formData.from)}</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">To:</span><span>{getLocationName(formData.to)}</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">Seat Number:</span><span>{selectedSeatNumber}</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">Fare:</span><span>{calculatePrice(formData.from, formData.to)} BDT</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">Trip Date:</span><span>{moment(tripDetails?.trip_date).format("MMMM Do YYYY")}</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">Departure Time:</span><span>{moment(tripDetails?.departure_time, 'HH:mm:ss').format('h:mm A')} (From Dhaka)</span></p>
										<p className="flex justify-between items-center mb-2"><span className="font-semibold">Arrival Time:</span><span>{moment(tripDetails?.arrival_time, 'HH:mm:ss').format('h:mm A')} (From Cox's Bazar)</span></p>
									</div>
								</div>


							</div>

							<div className="flex justify-end">
								<button
									className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
									
									onClick={handleSeatAdd}
								>
									Confirm seat
								</button>
								<button
									className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
									onClick={() => toggleModal(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SeatAddModal