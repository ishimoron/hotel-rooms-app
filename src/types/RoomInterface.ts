export interface RoomI {
	id: number,
	name: string,
	price: PriceI,
	updatedPrice?: PriceI | null;
	availability?: string
}

interface PriceI {
	value: number,
	currencyCode: string
}