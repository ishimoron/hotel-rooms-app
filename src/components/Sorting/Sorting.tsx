import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { SortE } from '../../enums/Sort';
import { RoomI } from '../../types/RoomInterface';

export interface SortingProps {
	roomsData: RoomI[];
	setRooms: React.Dispatch<React.SetStateAction<RoomI[]>>;
}

const Sorting: React.FC<SortingProps> = ({ roomsData, setRooms }) => {
	const [sortedBy, setSortedBy] = useState<SortE | null>(null);

	useEffect(() => {
		if (!roomsData) return;

		const sortedRooms = [...roomsData].sort((a, b) => {
			const priceA = a.updatedPrice ? a.updatedPrice.value : a.price.value;
			const priceB = b.updatedPrice ? b.updatedPrice.value : b.price.value;

			switch (sortedBy) {
				case SortE.PRICE_HIGH:
					return priceB - priceA;
				case SortE.PRICE_LOW:
					return priceA - priceB;
				case SortE.NAME:
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

		setRooms(sortedRooms);
	}, [sortedBy]);

	const handleSortChange = (sortBy: SortE) => {
		setSortedBy(sortBy);
	};

	return (
		<ButtonGroup className='d-flex mt-4 justify-content-center'>
			<Button
				variant='outline-primary'
				onClick={() => handleSortChange(SortE.NAME)}
				disabled={sortedBy === SortE.NAME}
				data-testid='sortByName'
			>
				Sort by Name
			</Button>
			<Button
				variant='outline-primary'
				onClick={() => handleSortChange(SortE.PRICE_HIGH)}
				disabled={sortedBy === SortE.PRICE_HIGH}
				data-testid='sortByPriceHigh'
			>
				Price
				<FaArrowDown className='mx-1' />
			</Button>
			<Button
				variant='outline-primary'
				onClick={() => handleSortChange(SortE.PRICE_LOW)}
				disabled={sortedBy === SortE.PRICE_LOW}
				data-testid='sortByPriceLow'
			>
				Price
				<FaArrowUp className='mx-1' />
			</Button>
		</ButtonGroup>
	);
};

export default Sorting;
