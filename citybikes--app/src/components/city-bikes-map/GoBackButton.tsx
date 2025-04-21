import { useAppDispatch } from '../../redux/hooks';
import { clearSelectedNetwork, clearError } from '../../redux/slices/cityBikesSlice';

// A simple button that clears the selected network from global state
// Used to navigate from the "Stations" (Layer 2) view back to the "Networks" (Layer 1) overview

const GoBackButton = () => {
	const dispatch = useAppDispatch();

	// Handler: Clears selected network from Redux store
	// Triggers a re-render to show all networks again
	const handleBack = () => {
		dispatch(clearSelectedNetwork());
		dispatch(clearError());
	};

	return (
		<button className='citybikesmap__backbutton' onClick={handleBack} style={{ margin: '1rem' }}>
			Back to Networks
		</button>
	);
};

export default GoBackButton;
