import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNetworks, fetchStations } from '../thunks/cityBikesThunk';
import { CityBikesState, Network, Station } from '../../types/CityBikesTypes';

// Initial City Bikes Redux State
const initialState: CityBikesState = {
	networks: [], // All networks (Layer 1)
	stations: [], // Stations for selected network (Layer 2)
	selectedNetwork: null, // Currently selected network ID
	loading: false, // Flag to indicate loading state
	error: null, // API error object
};

// City Bikes Slice
const cityBikesSlice = createSlice({
	name: 'cityBikes',
	initialState,
	reducers: {
		// Resets selected network and clears its stations
		// Used when going back from Layer 2 to Layer 1
		clearSelectedNetwork(state) {
			state.selectedNetwork = null;
			state.stations = [];
		},
		// Sets a selected network ID, triggering Layer 2 display
		setSelectedNetwork(state, action: PayloadAction<string>) {
			state.selectedNetwork = action.payload;
		},
		clearError(state) {
			state.error = null;
		},
	},

	// Extra Reducers for Async Thunks
	extraReducers: builder => {
		builder
			// Handle fetchNetworks lifecycle
			.addCase(fetchNetworks.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNetworks.fulfilled, (state, action: PayloadAction<Network[]>) => {
				state.loading = false;
				state.networks = action.payload;
			})
			.addCase(fetchNetworks.rejected, (state, action) => {
				state.loading = false;
				if (action.payload && typeof action.payload === 'object') {
					state.error = action.payload as { message: string; status: number };
				} else {
					state.error = { message: 'Unexpected error while fetching networks', status: 500 };
				}
			})

			// Handle fetchStations lifecycle
			.addCase(fetchStations.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchStations.fulfilled, (state, action: PayloadAction<Station[]>) => {
				state.loading = false;
				state.stations = action.payload;
			})
			.addCase(fetchStations.rejected, (state, action) => {
				state.loading = false;
				if (action.payload && typeof action.payload === 'object') {
					state.error = action.payload as { message: string; status: number };
				} else {
					state.error = { message: 'Unexpected error while fetching stations', status: 500 };
				}
			});
	},
});

export const { clearSelectedNetwork, setSelectedNetwork, clearError } = cityBikesSlice.actions;
export default cityBikesSlice.reducer;
