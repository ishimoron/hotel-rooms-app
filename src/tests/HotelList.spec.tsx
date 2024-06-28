import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import HotelList from '../components/HotelList/HotelList';

const mockRooms = [
	{
		id: 1,
		name: 'Sample Room 1',
		availability: 'available',
		price: {
			value: 100,
			currencyCode: 'USD',
		},
		updatedPrice: {
			value: 90,
			currencyCode: 'USD',
		},
	},
	{
		id: 2,
		name: 'Sample Room 2',
		availability: 'available',
		price: {
			value: 120,
			currencyCode: 'USD',
		},
		updatedPrice: {
			value: 110,
			currencyCode: 'USD',
		},
	},
];

jest.mock('../hooks/useFetch', () => ({
	useFetch: jest.fn(() => [mockRooms, false, null]),
}));

describe('HotelList component', () => {
	it('renders hotel items', async () => {
		render(<HotelList />);

		await waitFor(() => {
			const hotelItem1 = screen.getByText('Sample Room 1');
			const hotelItem2 = screen.getByText('Sample Room 2');
			expect(hotelItem1).toBeInTheDocument();
			expect(hotelItem2).toBeInTheDocument();
		});
	});
});
