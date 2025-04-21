// Location of a network
export interface Location {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

// Bike-sharing network ( Layer 1: network in a country)
export interface Network {
	id: string;
	name: string;
	company: string[];
	location: Location;
}

// Station in a network ( Layer 2 and 3: Stations per network with details)
export interface Station {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
	free_bikes: number;
	empty_slots: number;
	timestamp: string;
	extra?: {
		address: string;
		last_update: string;
		capacity: number;
	};
}

// CityBikesState - redux state for cityBikes data
export interface CityBikesState {
	networks: Network[]; // List of all networks
	stations: Station[] | null; // List of stations of the selected network
	selectedNetwork: string | null; // Currently selected network
	loading: boolean; // Loading state
	error: {
		message: string;
		status: number;
	} | null; // Error message
}
