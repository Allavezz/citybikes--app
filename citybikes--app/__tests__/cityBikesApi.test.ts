import { vi, describe, it, expect } from 'vitest';
import axios from 'axios';
import { getNetworks, getStations } from '../src/api/cityBikesApi';
import { ApiError } from '../src/types/ApiError';

// Mock the axios library to intercept API requests in the tests
vi.mock('axios');
const mockedAxios = axios as unknown as { get: vi.Mock };

describe('cityBikesApi', () => {
	// Test for successful network fetch
	it('fetches networks successfully', async () => {
		// Mock data for a successful network fetch response
		const mockData = {
			data: {
				networks: [
					{
						id: 'net1',
						name: 'Network One',
						company: [],
						location: { city: '', country: '', latitude: 0, longitude: 0 },
					},
				],
			},
		};

		// Mock axios to resolve the network fetch request
		mockedAxios.get.mockResolvedValueOnce(mockData);

		// Call the actual function (getNetworks) and verify the result
		const result = await getNetworks();
		expect(result).toEqual(mockData.data.networks);
	});

	// Test for failed network fetch (should throw ApiError)
	it('throws ApiError on failed network fetch', async () => {
		// Mock axios to simulate a 404 error on the network fetch
		mockedAxios.get.mockRejectedValueOnce({
			response: { status: 404, statusText: 'Not Found' },
			isAxiosError: true,
		});

		// Ensure that getNetworks throws an ApiError
		await expect(getNetworks()).rejects.toThrow(ApiError);
	});

	// Test for successful stations fetch
	it('fetches stations successfully', async () => {
		// Mock data for a successful stations fetch response
		const mockData = {
			data: {
				network: {
					stations: [
						{
							id: 'st1',
							name: 'Station One',
							latitude: 0,
							longitude: 0,
							free_bikes: 2,
							empty_slots: 3,
							timestamp: '2024-04-01T00:00:00Z',
						},
					],
				},
			},
		};

		// Mock axios to resolve the stations fetch request
		mockedAxios.get.mockResolvedValueOnce(mockData);

		// Call the actual function (getStations) and verify the result
		const result = await getStations('net1');
		expect(result).toEqual(mockData.data.network.stations);
	});

	// Test for failed stations fetch (should throw ApiError)
	it('throws ApiError on failed stations fetch', async () => {
		// Mock axios to simulate a 500 server error on the stations fetch
		mockedAxios.get.mockRejectedValueOnce({
			response: { status: 500, statusText: 'Server Error' },
			isAxiosError: true,
		});

		// Ensure that getStations throws an ApiError
		await expect(getStations('net1')).rejects.toThrow(ApiError);
	});
});
