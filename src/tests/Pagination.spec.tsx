import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationComponent from '../components/Pagination/Pagination';

const mockProps = {
	rooms: [
		{
			id: 1,
			name: 'Room 1',
			price: { value: 100, currencyCode: 'USD' },
		},
		{
			id: 2,
			name: 'Room 2',
			price: { value: 120, currencyCode: 'USD' },
		},
		{
			id: 3,
			name: 'Room 3',
			price: { value: 90, currencyCode: 'USD' },
		},
		{
			id: 4,
			name: 'Room 4',
			price: { value: 110, currencyCode: 'USD' },
		},
		{
			id: 5,
			name: 'Room 5',
			price: { value: 130, currencyCode: 'USD' },
		},
	],
	currentPage: 1,
	setCurrentPage: jest.fn(),
	itemsPerPage: 3,
};

describe('PaginationComponent', () => {
	it('renders pagination items correctly', () => {
		render(
			<PaginationComponent
				rooms={mockProps.rooms}
				currentPage={mockProps.currentPage}
				setCurrentPage={mockProps.setCurrentPage}
				itemsPerPage={mockProps.itemsPerPage}
			/>,
		);

		const firstPageButton = screen.getByRole('button', { name: 'First' });
		const prevPageButton = screen.getByRole('button', { name: 'Previous' });
		const nextPageButton = screen.getByRole('button', { name: 'Next' });
		const lastPageButton = screen.getByRole('button', { name: 'Last' });

		expect(firstPageButton).toBeInTheDocument();
		expect(prevPageButton).toBeInTheDocument();
		expect(nextPageButton).toBeInTheDocument();
		expect(lastPageButton).toBeInTheDocument();

		const paginationItems = screen.queryAllByRole('button', { name: /\d+/ });
		expect(paginationItems.length).toBe(1);
	});

	it('calls setCurrentPage correctly on page change', () => {
		render(
			<PaginationComponent
				rooms={mockProps.rooms}
				currentPage={mockProps.currentPage}
				setCurrentPage={mockProps.setCurrentPage}
				itemsPerPage={mockProps.itemsPerPage}
			/>,
		);

		const nextPageButton = screen.getByRole('button', { name: 'Next' });
		fireEvent.click(nextPageButton);

		expect(mockProps.setCurrentPage).toHaveBeenCalledWith(2);

		const prevPageButton = screen.getByRole('button', { name: 'Previous' });
		fireEvent.click(prevPageButton);

		expect(mockProps.setCurrentPage).toHaveBeenCalledWith(1);

		const lastPageButton = screen.getByRole('button', { name: 'Last' });
		fireEvent.click(lastPageButton);

		expect(mockProps.setCurrentPage).toHaveBeenCalledWith(2);
	});
});
