import { Marker } from 'react-leaflet';
import { Station } from '../../types/cityBikesTypes';
import StationDetailsL3 from './StationDetailsL3'; // Import the new Layer3 component
import { mapMarkerIcon } from './mapMarkerIcons';

interface StationsL2Props {
	stations: Station[]; // List of stations for selected network
}

// Layer 2: Renders all stations for the selected network

// On click, each marker shows station details.

const Layer2 = ({ stations }: StationsL2Props) => {
	return (
		<>
			{stations.map(station => (
				<Marker key={station.id} position={[station.latitude, station.longitude]} icon={mapMarkerIcon}>
					<StationDetailsL3 station={station} /> {/* Use Layer3 to show the station details */}
				</Marker>
			))}
		</>
	);
};

export default Layer2;
