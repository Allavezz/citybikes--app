import { configureStore } from '@reduxjs/toolkit';
import cityBikesReducer, { setSelectedNetwork, clearSelectedNetwork, clearError } from '../src/redux/slices/cityBikesSlice';
import { fetchNetworks, fetchStations } from '../src/redux/thunks/cityBikesThunk';
import { Network, Station } from '../src/types/CityBikesTypes';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the fetchNetworks and fetchStations thunks for testing purposes
vi.mock('../src/thunks/cityBikesThunk', () => ({
	fetchNetworks: vi.fn(),
	fetchStations: vi.fn(),
}));

describe('cityBikesSlice', () => {
	let store: any;

	// Setting up the store before each test to ensure it's a fresh state
	beforeEach(() => {
		store = configureStore({
			reducer: {
				cityBikes: cityBikesReducer,
			},
		});
	});

	// Test for checking the initial state of the cityBikes slice
	it('should handle initial state correctly', () => {
		const state = store.getState().cityBikes;
		expect(state.networks).toEqual([]); // Expect networks to be an empty array initially
		expect(state.stations).toEqual([]); // Expect stations to be an empty array initially
		expect(state.selectedNetwork).toBeNull(); // Expect no selected network initially
		expect(state.loading).toBe(false); // Expect loading to be false initially
		expect(state.error).toBeNull(); // Expect no error initially
	});

	// Test for handling the action that sets the selected network
	it('should handle setSelectedNetwork action', () => {
		store.dispatch(setSelectedNetwork('network-1'));
		const state = store.getState().cityBikes;
		expect(state.selectedNetwork).toBe('network-1'); // Expect selected network to be 'network-1'
	});

	// Test for handling the action that clears the selected network
	it('should handle clearSelectedNetwork action', () => {
		store.dispatch(setSelectedNetwork('network-1')); // Set network first
		store.dispatch(clearSelectedNetwork()); // Then clear it
		const state = store.getState().cityBikes;
		expect(state.selectedNetwork).toBeNull(); // Expect selected network to be null
		expect(state.stations).toEqual([]); // Expect stations to be an empty array after clearing the network
	});

	// Test for handling the action that clears any error
	it('should handle clearError action', () => {
		store.dispatch(clearError());
		const state = store.getState().cityBikes;
		expect(state.error).toBeNull(); // Expect error to be null after clearing it
	});

	// Tests for the fetchNetworks async actions (pending, fulfilled, rejected)
	describe('fetchNetworks async actions', () => {
		// Test for handling the pending state of the fetchNetworks action
		it('should handle fetchNetworks.pending action', async () => {
			const mockPendingAction = { type: fetchNetworks.pending.type };
			store.dispatch(mockPendingAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(true); // Expect loading to be true while fetching
			expect(state.error).toBeNull(); // Expect no error while fetching
		});

		// Test for handling the fulfilled state of the fetchNetworks action
		it('should handle fetchNetworks.fulfilled action', async () => {
			const mockNetworks: Network[] = [
				{
					id: '1',
					name: 'Network 1',
					company: ['Company A'],
					location: {
						city: 'London',
						country: 'UK',
						latitude: 51.505,
						longitude: -0.09,
					},
				},
			];

			const mockFulfilledAction = { type: fetchNetworks.fulfilled.type, payload: mockNetworks };
			store.dispatch(mockFulfilledAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(false); // Expect loading to be false after fulfillment
			expect(state.networks).toEqual(mockNetworks); // Expect networks to be updated with mock data
		});

		// Test for handling the rejected state of the fetchNetworks action
		it('should handle fetchNetworks.rejected action', async () => {
			const mockError = { message: 'Error fetching networks', status: 500 };
			const mockRejectedAction = {
				type: fetchNetworks.rejected.type,
				payload: mockError,
			};
			store.dispatch(mockRejectedAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(false); // Expect loading to be false after rejection
			expect(state.error).toEqual(mockError); // Expect error to be updated with the rejection error
		});
	});

	// Tests for the fetchStations async actions (pending, fulfilled, rejected)
	describe('fetchStations async actions', () => {
		// Test for handling the pending state of the fetchStations action
		it('should handle fetchStations.pending action', async () => {
			const mockPendingAction = { type: fetchStations.pending.type };
			store.dispatch(mockPendingAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(true); // Expect loading to be true while fetching stations
			expect(state.error).toBeNull(); // Expect no error while fetching
		});

		// Test for handling the fulfilled state of the fetchStations action
		it('should handle fetchStations.fulfilled action', async () => {
			const mockStations: Station[] = [
				{
					id: '1',
					name: 'Station 1',
					latitude: 51.505,
					longitude: -0.09,
					free_bikes: 10,
					empty_slots: 5,
					timestamp: '2025-04-21T10:00:00',
					extra: {
						address: '123 Street, London',
						last_update: '2025-04-21T09:00:00',
						capacity: 15,
					},
				},
			];

			const mockFulfilledAction = { type: fetchStations.fulfilled.type, payload: mockStations };
			store.dispatch(mockFulfilledAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(false); // Expect loading to be false after fulfillment
			expect(state.stations).toEqual(mockStations); // Expect stations to be updated with mock data
		});

		// Test for handling the rejected state of the fetchStations action
		it('should handle fetchStations.rejected action', async () => {
			const mockError = { message: 'Error fetching stations', status: 500 };
			const mockRejectedAction = {
				type: fetchStations.rejected.type,
				payload: mockError,
			};
			store.dispatch(mockRejectedAction);

			const state = store.getState().cityBikes;
			expect(state.loading).toBe(false); // Expect loading to be false after rejection
			expect(state.error).toEqual(mockError); // Expect error to be updated with the rejection error
		});
	});
});
