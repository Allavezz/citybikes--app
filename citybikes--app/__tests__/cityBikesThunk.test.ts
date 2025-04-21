// Mock the API methods to simulate network calls
import { vi } from 'vitest';

vi.mock('../src/api/cityBikesApi', () => ({
	getNetworks: vi.fn(), // Mock the getNetworks function
	getStations: vi.fn(), // Mock the getStations function
}));

// Import the actual API functions and redux actions that will be tested
import { getNetworks, getStations } from '../src/api/cityBikesApi'; // These will use the mocked versions
import { fetchNetworks, fetchStations } from '../src/redux/thunks/cityBikesThunk'; // Thunks that dispatch actions
import { configureStore } from '@reduxjs/toolkit'; // Used for creating the store in tests
import cityBikesReducer from '../src/redux/slices/cityBikesSlice'; // Reducer to be tested
import { Network, Station } from '../src/types/CityBikesTypes'; // Types for the mock data
import { ApiError } from '../src/types/ApiError'; // ApiError used for rejected actions
import { describe, it, expect, beforeEach } from 'vitest'; // Testing utilities from vitest

// Test suite for cityBikesThunk - checking the async behavior of fetchNetworks and fetchStations
describe('cityBikesThunk', () => {
	let store: any;

	// Initialize a new store before each test
	beforeEach(() => {
		store = configureStore({
			reducer: {
				cityBikes: cityBikesReducer, // Use the actual reducer
			},
		});
	});

	// Tests related to the fetchNetworks thunk (action)
	describe('fetchNetworks', () => {
		// Test case: Fetch networks successfully
		it('should dispatch fulfilled action on successful API call', async () => {
			// Mock data representing successful API response
			const mockNetworks: Network[] = [
				{
					id: '1',
					name: 'Network 1',
					company: ['Company A'],
					location: { city: 'London', country: 'UK', latitude: 51.505, longitude: -0.09 },
				},
			];

			// Mock the resolved value of getNetworks function to simulate a successful response
			(getNetworks as any).mockResolvedValueOnce(mockNetworks);

			// Dispatch the fetchNetworks thunk
			await store.dispatch(fetchNetworks());

			// Check the updated state of the store after the successful API call
			const state = store.getState().cityBikes;
			expect(state.networks).toEqual(mockNetworks); // Expect the networks state to match the mock data
			expect(state.loading).toBe(false); // Expect loading to be false after the action completes
		});

		// Test case: Fetch networks failed
		it('should dispatch rejected action on API failure', async () => {
			// Mock error object to simulate an API failure
			const mockError = new ApiError('Network error', 500);
			(getNetworks as any).mockRejectedValueOnce(mockError); // Mock rejection with error

			// Dispatch the fetchNetworks thunk
			await store.dispatch(fetchNetworks());

			// Check the updated state of the store after the failed API call
			const state = store.getState().cityBikes;
			expect(state.error).toEqual({ message: 'Network error', status: 500 }); // Expect error state to be populated
			expect(state.loading).toBe(false); // Expect loading to be false after the action completes
		});
	});

	// Tests related to the fetchStations thunk (action)
	describe('fetchStations', () => {
		// Test case: Fetch stations successfully
		it('should dispatch fulfilled action on successful API call', async () => {
			// Mock data representing successful API response for stations
			const mockStations: Station[] = [
				{
					id: '1',
					name: 'Station 1',
					latitude: 51.505,
					longitude: -0.09,
					free_bikes: 10,
					empty_slots: 5,
					timestamp: '2025-04-21T10:00:00',
					extra: { address: '123 Street, London', last_update: '2025-04-21T09:00:00', capacity: 15 },
				},
			];

			// Mock the resolved value of getStations function to simulate a successful response
			(getStations as any).mockResolvedValueOnce(mockStations);

			// Dispatch the fetchStations thunk with a network id ('1')
			await store.dispatch(fetchStations('1'));

			// Check the updated state of the store after the successful API call
			const state = store.getState().cityBikes;
			expect(state.stations).toEqual(mockStations); // Expect the stations state to match the mock data
			expect(state.loading).toBe(false); // Expect loading to be false after the action completes
		});

		// Test case: Fetch stations failed
		it('should dispatch rejected action on API failure', async () => {
			// Mock error object to simulate an API failure
			const mockError = new ApiError('Network error', 500);
			(getStations as any).mockRejectedValueOnce(mockError); // Mock rejection with error

			// Dispatch the fetchStations thunk
			await store.dispatch(fetchStations('1'));

			// Check the updated state of the store after the failed API call
			const state = store.getState().cityBikes;
			expect(state.error).toEqual({ message: 'Network error', status: 500 }); // Expect error state to be populated
			expect(state.loading).toBe(false); // Expect loading to be false after the action completes
		});
	});
});
