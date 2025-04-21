import { Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'; // Import MarkerClusterGroup
import { Network } from '../../types/CityBikesTypes';
import { mapMarkerIcon } from './mapMarkerIcons';

interface NetworksL1Props {
	networks: Network[]; // Array of networks (Layer 1)
	onSelectNetwork: (id: string) => void; // Callback to trigger when a network is selected
}

// Renders Layer 1 markers for all available networks

// Optionally Uses MarkerClusterGroup to cluster nearby markers together to improve performance and user experience
// When a marker is clicked, triggers `onSelectedNetwork` with network's ID

// This layer is rendered when no specific network is selected

const NetworksL1 = ({ networks, onSelectNetwork }: NetworksL1Props) => {
	return (
		<MarkerClusterGroup>
			{networks.map(network => (
				<Marker
					key={network.id}
					position={[network.location.latitude, network.location.longitude]}
					icon={mapMarkerIcon}
					eventHandlers={{
						click: () => onSelectNetwork(network.id),
					}}
				></Marker>
			))}
		</MarkerClusterGroup>
	);
};

export default NetworksL1;
