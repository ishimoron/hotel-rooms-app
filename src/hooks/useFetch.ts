import { useEffect, useState } from 'react'

interface FetchParams {
	method: string;
	headers?: HeadersInit;
	body?: BodyInit;
}

export const useFetch = <T>(url: string, params: FetchParams) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(url, params);

				if (!response.ok) {
					throw new Error('Something happen with network...');
				}

				const responseData = await response.json();
				setData(responseData);
			} catch (e) {
				if (e instanceof Error) {
					setError(e);
				} else {
					setError(new Error('Unknown error occurred...'));
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return [data, loading, error] as const;
};
