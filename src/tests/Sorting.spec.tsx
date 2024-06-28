import { fireEvent, render } from '@testing-library/react';
import Sorting, { SortingProps } from '../components/Sorting/Sorting';

describe('Sorting', () => {
	const roomsData = [
		{ id: 1, name: 'Room 1', price: { currencyCode: 'USD', value: 100 } },
		{ id: 2, name: 'Room 2', price: { currencyCode: 'USD', value: 120 } },
		{ id: 3, name: 'Room 3', price: { currencyCode: 'USD', value: 90 } },
		{ id: 4, name: 'Room 4', price: { currencyCode: 'USD', value: 110 } },
		{ id: 5, name: 'Room 5', price: { currencyCode: 'USD', value: 130 } },
	];

	it('sorts rooms by name correctly', () => {
		const setRoomsMock = jest.fn();
		const props: SortingProps = { roomsData, setRooms: setRoomsMock };

		const { getByTestId } = render(<Sorting {...props} />);

		const sortByNameButton = getByTestId('sortByName');
		fireEvent.click(sortByNameButton);

		expect(setRoomsMock).toHaveBeenCalledWith([
			{ id: 1, name: 'Room 1', price: { currencyCode: 'USD', value: 100 } },
			{ id: 2, name: 'Room 2', price: { currencyCode: 'USD', value: 120 } },
			{ id: 3, name: 'Room 3', price: { currencyCode: 'USD', value: 90 } },
			{ id: 4, name: 'Room 4', price: { currencyCode: 'USD', value: 110 } },
			{ id: 5, name: 'Room 5', price: { currencyCode: 'USD', value: 130 } },
		]);
	});

	it('sorts rooms by price (high to low) correctly', () => {
		const setRoomsMock = jest.fn();
		const props: SortingProps = { roomsData, setRooms: setRoomsMock };

		const { getByTestId } = render(<Sorting {...props} />);

		const sortByPriceHighButton = getByTestId('sortByPriceHigh');
		fireEvent.click(sortByPriceHighButton);

		expect(setRoomsMock).toHaveBeenCalledWith([
			{ id: 5, name: 'Room 5', price: { currencyCode: 'USD', value: 130 } },
			{ id: 2, name: 'Room 2', price: { currencyCode: 'USD', value: 120 } },
			{ id: 4, name: 'Room 4', price: { currencyCode: 'USD', value: 110 } },
			{ id: 1, name: 'Room 1', price: { currencyCode: 'USD', value: 100 } },
			{ id: 3, name: 'Room 3', price: { currencyCode: 'USD', value: 90 } },
		]);
	});

	it('sorts rooms by price (low to high) correctly', () => {
		const setRoomsMock = jest.fn();
		const props: SortingProps = { roomsData, setRooms: setRoomsMock };

		const { getByTestId } = render(<Sorting {...props} />);

		const sortByPriceLowButton = getByTestId('sortByPriceLow');
		fireEvent.click(sortByPriceLowButton);

		expect(setRoomsMock).toHaveBeenCalledWith([
			{ id: 3, name: 'Room 3', price: { currencyCode: 'USD', value: 90 } },
			{ id: 1, name: 'Room 1', price: { currencyCode: 'USD', value: 100 } },
			{ id: 4, name: 'Room 4', price: { currencyCode: 'USD', value: 110 } },
			{ id: 2, name: 'Room 2', price: { currencyCode: 'USD', value: 120 } },
			{ id: 5, name: 'Room 5', price: { currencyCode: 'USD', value: 130 } },
		]);
	});
});
