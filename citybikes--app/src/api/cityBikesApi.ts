import axios from 'axios';
import { Network, Station } from '../types/cityBikesTypes';
import { ApiError } from '../types/ApiError';

// API key stored in .ENV file for security
const CITYBIKES_URL = import.meta.env.VITE_CITYBIKES_API_BASE_URL;

// Fetch the list off all networks (Layer 1)
export async function getNetworks(): Promise<Network[]> {
	try {
		const res = await axios.get(`${CITYBIKES_URL}/networks`);
		return res.data.networks; // Return array of networks
	} catch (error) {
		let errorMessage = 'An unexpected error occurred while fetching networks';
		let statusCode = 500;

		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.statusText || 'Failed to fetch networks';
			statusCode = error.response?.status || 500;
		}

		throw new ApiError(errorMessage, statusCode);
	}
}

// Fetch stations for a specific network (Layer 2)
export async function getStations(networkId: string): Promise<Station[]> {
	try {
		const res = await axios.get(`${CITYBIKES_URL}/networks/${networkId}`);
		return res.data.network.stations; // Return array of stations for selected network
	} catch (error) {
		let errorMessage = `An unexpected error occurred while fetching stations for network ${networkId}`;
		let statusCode = 500;

		if (axios.isAxiosError(error)) {
			errorMessage = error.response?.statusText || 'Failed to fetch stations';
			statusCode = error.response?.status || 500;
		}

		throw new ApiError(errorMessage, statusCode);
	}
}
