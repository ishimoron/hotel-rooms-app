import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useFetch } from '../../hooks/useFetch';
import { RoomI } from '../../types/RoomInterface';
import HotelItem from '../HotelItem/HotelItem';

import PaginationComponent from '../Pagination/Pagination';
import Sorting from '../Sorting/Sorting';

const URL = 'https://dcontent.inviacdn.net/shared/dev/test-api';

const HotelList: React.FC = () => {
	const [rooms, setRooms] = useState<RoomI[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const itemsPerPage = 4;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedRooms = rooms.slice(startIndex, startIndex + itemsPerPage);

	const [data, loading, error] = useFetch<RoomI[]>(`${URL}/rooms`, {
		method: 'GET',
	});

	useEffect(() => {
		if (data) {
			setRooms(data);
		}
	}, [data]);

	const checkAvailability = async (roomId: number) => {
		try {
			const response = await fetch(`${URL}/room/${roomId}`);
			const { availabilityStatus, price } = await response.json();

			const updatedRooms =
				rooms &&
				rooms.map(room =>
					room.id === roomId
						? {
								...room,
								availability: availabilityStatus,
								updatedPrice: price
									? {
											value: price.value,
											currencyCode: price.currencyCode,
									  }
									: null,
						  }
						: room,
				);

			setRooms(updatedRooms);
		} catch (error) {
			console.error('Error checking availability:', error);
		}
	};

	return (
		<>
			{error && <div>{error.message}</div>}

			<Container>
				{rooms && (
					<Sorting
						roomsData={rooms}
						setRooms={setRooms}
					/>
				)}
				{loading && (
					<Spinner
						animation='border'
						role='status'
						className='d-flex my-3 mx-auto'
					>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				)}
				<Row
					xs={1}
					md={2}
					className='g-4 justify-content-center mt-4'
				>
					{data && (
						<HotelItem
							rooms={paginatedRooms}
							checkAvailability={checkAvailability}
						/>
					)}
				</Row>
				<PaginationComponent
					rooms={rooms}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					itemsPerPage={itemsPerPage}
				/>
			</Container>
		</>
	);
};

export default HotelList;
