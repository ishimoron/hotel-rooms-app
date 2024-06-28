import { Badge, Button, Card, Col } from 'react-bootstrap';
import { AvailabilityStatus } from '../../enums/AvailabilityStatus';
import { RoomI } from '../../types/RoomInterface';

export interface HotelItemProps {
	rooms: RoomI[];
	checkAvailability: (roomId: number) => void;
}

const HotelItem: React.FC<HotelItemProps> = ({ rooms, checkAvailability }) => {
	const bookRoom = (roomId: number) => {
		const foundRoom = rooms.find(room => room.id === roomId);
		console.log(foundRoom);
	};

	const getBadgeColor = (availability: string) => {
		switch (availability) {
			case AvailabilityStatus.AVAILABLE:
				return 'success';
			case AvailabilityStatus.ERROR:
				return 'danger';
			case AvailabilityStatus.ON_REQUEST:
				return 'warning';
			case AvailabilityStatus.SOLD_OUT:
				return 'secondary';
		}
	};

	return (
		<>
			{rooms &&
				rooms.length > 0 &&
				rooms.map((room: RoomI) => {
					return (
						<Col key={room.id}>
							<Card>
								<Card.Body>
									<div className=''>
										<div>
											<div className='d-flex justify-content-between align-items-center'>
												<h5>{room.name}</h5>
												{room.availability && (
													<Badge bg={getBadgeColor(room.availability)}>{room.availability}</Badge>
												)}
											</div>
											<span>
												{room.availability && <del>{room.price.value}</del>}
												{room.availability
													? <span className='mx-1'>{room.updatedPrice?.value}</span> ?? 'N/A'
													: room.price.value}
											</span>
											<span>{room.price.currencyCode}</span>
										</div>
										<div className='mt-3'>
											<Button
												variant='primary'
												onClick={() => {
													checkAvailability(room.id);
												}}
											>
												Check room
											</Button>
											<Button
												variant='primary'
												className='mx-2'
												disabled={room.availability !== AvailabilityStatus.AVAILABLE}
												onClick={() => {
													bookRoom(room.id);
												}}
											>
												Book
											</Button>
										</div>
									</div>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
		</>
	);
};

export default HotelItem;
