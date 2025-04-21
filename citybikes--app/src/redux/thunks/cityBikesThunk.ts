import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNetworks, getStations } from '../../api/cityBikesApi';
import { ApiError } from '../../types/ApiError';

// Thunk to fetch all networks (Layer 1)
// Dispatches:
// fetchNetworks.pending
// fetchNetworks.fulfilled (Network[] payload)
// fetchNetworks.rejected ({ message, status } payload)
export const fetchNetworks = createAsyncThunk('cityBikes/fetchNetworks', async (_, { rejectWithValue }) => {
	try {
		const networks = await getNetworks();
		return networks;
	} catch (error) {
		if (error instanceof ApiError) {
			return rejectWithValue({ message: error.message, status: error.status });
		}
		return rejectWithValue({ message: 'Unknown error', status: 500 });
	}
});

// Thunk to fetch stations for a specific network (Layer 2)
// Dispatches:
// fetchStations.pending
// fetchStations.fulfilled (Station[] payload)
// fetchStations.rejected ({ message, status } payload)
export const fetchStations = createAsyncThunk('cityBikes/fetchStations', async (networkId: string, { rejectWithValue }) => {
	try {
		const stations = await getStations(networkId);
		return stations;
	} catch (error) {
		if (error instanceof ApiError) {
			return rejectWithValue({ message: error.message, status: error.status });
		}
		return rejectWithValue({ message: 'Unknown error', status: 500 });
	}
});
