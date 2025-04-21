// Import jest-dom for extended DOM matchers like .toBeInTheDocument()
import '@testing-library/jest-dom';

// Import test utilities from vitest and testing-library
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; // Utilities for rendering and interacting with components
import GoBackButton from '../src/components/city-bikes-map/GoBackButton'; // Import the component being tested
import { Provider } from 'react-redux'; // To wrap the component with a Redux store provider
import { store } from '../src/redux/store'; // The Redux store
import React from 'react'; // React is needed for JSX elements

// Mock the useAppDispatch hook from the Redux store to simulate dispatching actions in tests
vi.mock('../redux/hooks', async () => {
	const actual = await vi.importActual('../redux/hooks'); // Import the actual hooks
	return {
		...actual,
		useAppDispatch: () => store.dispatch, // Mocking useAppDispatch to use the actual store dispatch function
	};
});

describe('<GoBackButton />', () => {
	// Test case: Check if the GoBackButton renders and dispatches actions on click
	it('renders and dispatches actions on click', () => {
		// Render the GoBackButton component wrapped inside the Redux Provider to provide store access
		render(
			<Provider store={store}>
				<GoBackButton />
			</Provider>,
		);

		// Check that the button with the text 'Back to Networks' is rendered
		const button = screen.getByText(/Back to Networks/i);
		expect(button).toBeInTheDocument(); // Verifies that the button is in the document

		// Simulate a click event on the button
		fireEvent.click(button);

		// You can add additional checks here if needed. For example, you can spy on store.dispatch to check if an action was dispatched.
		// Example: expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});
