import L from 'leaflet';

// Custom Leaflet marker icons

// Networks and Stations
export const mapMarkerIcon = L.icon({
	iconUrl: '/assets/city-bikes-map/toy.png', // bicycle icon
	iconSize: [30, 30],
	iconAnchor: [9, 30],
	popupAnchor: [5.8, -28],
});

// User geolocation
export const userLocationIcon = L.icon({
	iconUrl: '/assets/city-bikes-map/user.png',
	iconSize: [30, 30],
	iconAnchor: [9, 30],
	popupAnchor: [5.8, -28],
});
