import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import SeatDiagram from '@/Components/SeatDiagram';

const Ticket = ({ auth }) => {
	const [locationList, setLocationList] = useState([]);

	// const [seatList, setSeatList] = useState([]);
	const [tripDetails, setTripDetails] = useState([]);
	
	


	const getDefaultDate = () => {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		let month = currentDate.getMonth() + 1;
		let day = currentDate.getDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	};
	const [formData, setFormData] = useState({
		from: '',
		to: '',
		date: getDefaultDate() // Set default date here
	});

	const getLocations = async () => {
		try {
			const response = await axios.get(`/api/getAllLocations`);
			setLocationList(response?.data);
		} catch (error) {
			console.error('Error fetching locations:', error);
		}
	};

	useEffect(() => {
		(async () => await getLocations())();
	}, []);

	const renderLocationOptions = (selectedFromLocationId) => {
		return locationList.map((location) => (
			<option
				key={location.location_id}
				value={location.location_id}
				disabled={location.location_id === parseInt(selectedFromLocationId)}
			>
				{location.location_name}
			</option>
		));
	};

	const handleFromChange = (e) => {
		const selectedFromLocationId = e.target.value;

		setFormData({
			...formData,
			from: selectedFromLocationId
		});

		const updatedLocationList = locationList.map((location) => ({
			...location,
			disabled: location.location_id === parseInt(selectedFromLocationId)
		}));
		setLocationList(updatedLocationList);
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();


		const diff = parseInt(formData.to) - parseInt(formData.from);

		const tripType = diff > 0 ? 'forward' : 'reverse';

		handleSearch(tripType, formData);

	};


	const handleSearch = async (tripType, formData) => {

		try {
			const response = await axios.get(`/api/ticketSearch/`, {
				params: {
					date: formData.date,
					tripType: tripType
				}
			});

			setTripDetails(response?.data);
		} catch (error) {
			console.error('Error fetching locations:', error);
		}

	}



	const getFormattedDate = (offset) => {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + offset);
		const year = currentDate.getFullYear();
		let month = currentDate.getMonth() + 1;
		let day = currentDate.getDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	};



	const minDate = getFormattedDate(-2); // Two days before
	const maxDate = getFormattedDate(2); // Two days after


	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ticket Counter</h2>}
		>
			<Head title="Ticket" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<form onSubmit={handleSubmit} className="p-6 text-gray-900">
							<div className="flex items-center justify-center space-x-4 mb-4">
								<div className="w-1/3">
									<label htmlFor="from" className="block text-gray-700 font-bold mb-2">
										From
									</label>
									<select
										id="from"
										name="from"
										value={formData.from}
										onChange={handleFromChange}
										className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									>
										<option value="">Select origin</option>
										{renderLocationOptions('')}
									</select>
								</div>
								<div className="w-1/3">
									<label htmlFor="to" className="block text-gray-700 font-bold mb-2">
										To
									</label>
									<select
										id="to"
										name="to"
										value={formData.to}
										onChange={handleInputChange}
										className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									>
										<option value="">Select destination</option>
										{renderLocationOptions(formData.from)}
									</select>
								</div>
								<div className="w-1/3">
									<label htmlFor="date" className="block text-gray-700 font-bold mb-2">
										Date
									</label>
									<input
										type="date"
										id="date"
										name="date"
										value={formData.date}
										onChange={handleInputChange}
										min={minDate}
										max={maxDate}
										className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
							</div>
							<div className="flex justify-center">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Submit
								</button>
							</div>
						</form>
					</div>

					{/* <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-10">
						
					</div> */}

					{
						tripDetails.length > 0 ?
							<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-10">
								<h1 className="text-2xl font-bold py-4 text-center">Trip Details</h1>

								<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-12 gap-4">
									<div className=" overflow-hidden shadow-sm sm:rounded-lg col-span-6 py-3">
										<SeatDiagram auth={auth} tripDetails={tripDetails[0]} locationList={locationList} formData={formData}/>
									</div>
									<div className="bg-blue-100 overflow-hidden shadow-sm sm:rounded-lg col-span-6">
									</div>
								</div>
							</div>
							:
							<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-10">
								{/* <h1 className="text-2xl font-bold py-4 text-center">Trip Details</h1>

								<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-12 gap-4">
									<div className=" overflow-hidden shadow-sm sm:rounded-lg col-span-6 py-3">
										<SeatDiagram auth={auth} tripDetails={tripDetails} />
									</div>
									<div className="bg-blue-100 overflow-hidden shadow-sm sm:rounded-lg col-span-6 mb-5">
									</div>
								</div> */}
							</div>
					}
				</div>
			</div>

		</AuthenticatedLayout>
	);
};

export default Ticket;
