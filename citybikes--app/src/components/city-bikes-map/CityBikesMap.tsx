import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import NetworksL1 from './NetworksL1';
import StationsL2 from './StationsL2';
import GoBackButton from './GoBackButton';
import { fetchNetworks, fetchStations } from '../../redux/thunks/cityBikesThunk';
import { setSelectedNetwork } from '../../redux/slices/cityBikesSlice';
import { userLocationIcon } from './mapMarkerIcons';

// Default map settings used when user location is not available ( Europe centered)
const defaultCenter: [number, number] = [50, 0];
const defaultZoom = 3;

const CityBikesMap = () => {
	const dispatch = useAppDispatch();

	// Extract required state from Redux store
	const { selectedNetwork, stations, networks, loading, error } = useAppSelector(state => state.cityBikes);

	// Local state for map position and user geolocation
	const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
	const [zoom, setZoom] = useState<number>(defaultZoom);
	const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

	// Get user geolocation and set map center and zoom accordingly
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					const coordsArr: [number, number] = [coords.latitude, coords.longitude];
					setUserLocation(coordsArr);
					setMapCenter(coordsArr);
					setZoom(13);
				},
				() => {
					// On permission denied or failure, fallback to default
					setMapCenter(defaultCenter);
					setZoom(defaultZoom);
				},
			);
		} else {
			// Geolocation API not supported
			setMapCenter(defaultCenter);
			setZoom(defaultZoom);
		}
	}, []);

	// Fetch all available networks (Layer 1) once the map center is set
	useEffect(() => {
		if (mapCenter && networks.length === 0) {
			dispatch(fetchNetworks());
		}
	}, [dispatch, mapCenter, networks.length]);

	// Handles clicking on a network marker:
	// Sets selected network in store
	// Fetches its stations (Layer 2)
	const handleNetworkClick = useCallback(
		(networkId: string) => {
			dispatch(setSelectedNetwork(networkId));
			dispatch(fetchStations(networkId));
		},
		[dispatch],
	);

	// Don't render the map until we have a center
	if (!mapCenter) return null;

	return (
		<div className='citybikesmap'>
			<h2 className='citybikesmap__h2'>City Bikes Map</h2>
			<h3 className='citybikesmap__h3'>{selectedNetwork ? `${networks.find(n => n.id === selectedNetwork)?.name}` : 'Select a Network'}</h3>
			<div>
				{/* Loading State */}
				{loading && (
					<div className='citybikesmap__loading'>
						<span>Loading map data...</span>
					</div>
				)}

				{/* Error State */}
				{error && (
					<div className='citybikesmap__error'>
						<span>
							Error {error.status}: {error.message}
						</span>
					</div>
				)}

				<MapContainer
					className='citybikesmap__container'
					center={mapCenter}
					zoom={zoom}
					minZoom={3}
					maxBounds={[
						[-85, -180],
						[85, 180],
					]}
					maxBoundsViscosity={1.0}
				>
					<TileLayer attribution='&copy; OpenStreetMap contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' noWrap />

					{/* Layer 1: Networks */}
					{!selectedNetwork && <NetworksL1 networks={networks} onSelectNetwork={handleNetworkClick} />}

					{/* Layer 2: Stations */}
					{selectedNetwork && stations && <StationsL2 stations={stations} />}

					{/* Optional: Show user location marker */}
					{userLocation && <Marker position={userLocation} icon={userLocationIcon}></Marker>}

					{/* Go back only when network is selected */}
					{selectedNetwork && <GoBackButton />}
				</MapContainer>
			</div>
		</div>
	);
};

export default CityBikesMap;
