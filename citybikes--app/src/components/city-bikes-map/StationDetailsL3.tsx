import { Popup } from 'react-leaflet';
import { Station } from '../../types/CityBikesTypes';

interface StationDetailsL3Props {
	station: Station; // Station data object for a specific station
}

// Layer 3: Displayes detailed info for a selected station

const Layer3 = ({ station }: StationDetailsL3Props) => {
	const cleanedTimestamp = station.timestamp?.replace(/\+00:00Z$/, '+00:00'); // remove redundant Z
	const parsedDate = cleanedTimestamp ? new Date(cleanedTimestamp) : null;
	const isValidDate = parsedDate instanceof Date && !isNaN(parsedDate.getTime());

	return (
		<Popup className='citybikesmap__popup'>
			<h4>{station.name}</h4>
			<span>
				<strong>Bikes Available:</strong> {station.free_bikes}
			</span>
			<span>
				<strong>Empty slots:</strong> {station.empty_slots}
			</span>
			<span>
				<strong>Address:</strong> {station.extra?.address || 'N/A'}
			</span>
			<span>
				<strong>Capacity:</strong> {station.extra?.capacity || 'N/A'}
			</span>
			<span>
				<strong>Last updated:</strong> {isValidDate ? parsedDate.toLocaleString() : 'N/A'}
			</span>
		</Popup>
	);
};

export default Layer3;
