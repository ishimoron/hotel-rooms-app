import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HotelItem, { HotelItemProps } from '../components/HotelItem/HotelItem';
import { AvailabilityStatus } from '../enums/AvailabilityStatus';
import { RoomI } from '../types/RoomInterface';

const mockRooms: RoomI[] = [
	{
		id: 1,
		name: 'Sample Room',
		availability: AvailabilityStatus.AVAILABLE,
		price: {
			value: 100,
			currencyCode: 'USD',
		},
		updatedPrice: {
			value: 90,
			currencyCode: 'USD',
		},
	},
];

const mockCheckAvailability = jest.fn();
const mockBookRoom = jest.fn();

const setup = (props: Partial<HotelItemProps> = {}) => {
	const defaultProps: HotelItemProps = {
		rooms: mockRooms,
		checkAvailability: mockCheckAvailability,
		...props,
	};

	render(<HotelItem {...defaultProps} />);
};

describe('HotelItem component', () => {
	beforeEach(() => {
		mockCheckAvailability.mockClear();
		mockBookRoom.mockClear();
	});

	it('renders room name and availability badge correctly', async () => {
		setup();

		const roomNameElement = screen.getByText('Sample Room');
		expect(roomNameElement).toBeInTheDocument();

		const availabilityBadge = screen.getByText('available');
		expect(availabilityBadge).toBeInTheDocument();
		expect(availabilityBadge).toHaveClass('bg-success');
	});

	it('does not trigger bookRoom when "Book" button is clicked on unavailable room', async () => {
		const unavailableRoom: RoomI = {
			id: 2,
			name: 'Unavailable Room',
			availability: AvailabilityStatus.SOLD_OUT,
			price: {
				value: 120,
				currencyCode: 'USD',
			},
		};

		setup({ rooms: [unavailableRoom] });

		const bookButton = screen.getByText('Book');
		expect(bookButton).toHaveAttribute('disabled');

		fireEvent.click(bookButton);

		await waitFor(() => {
			expect(mockBookRoom).not.toHaveBeenCalled();
		});
	});
});
