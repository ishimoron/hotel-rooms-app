import { Pagination, Row } from 'react-bootstrap';
import { RoomI } from '../../types/RoomInterface';

interface PaginationComponentProps {
	rooms: RoomI[];
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	itemsPerPage: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
	rooms,
	currentPage,
	setCurrentPage,
	itemsPerPage,
}) => {
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(rooms.length / itemsPerPage);
	const pages = Array(totalPages)
		.fill(null)
		.map((_, index) => index + 1);

	return (
		<Row className='mt-4'>
			<Pagination className='d-flex justify-content-center'>
				<Pagination.First onClick={() => handlePageChange(pages[0])} />
				<Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />

				{pages.map(pageNumber => (
					<Pagination.Item
						onClick={() => handlePageChange(pageNumber)}
						active={pageNumber === currentPage}
						key={pageNumber}
					>
						{pageNumber}
					</Pagination.Item>
				))}

				<Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
				<Pagination.Last onClick={() => handlePageChange(totalPages)} />
			</Pagination>
		</Row>
	);
};

export default PaginationComponent;
