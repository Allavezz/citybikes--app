import { configureStore } from '@reduxjs/toolkit';
import cityBikesReducer from './slices/cityBikesSlice';

// Redux store
export const store = configureStore({
	reducer: {
		cityBikes: cityBikesReducer, // Register the cityBikes slice reducer
	},
});

// Type for RootState, which represents the overall state of the app
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch, which is used for dispatching actions
export type AppDispatch = typeof store.dispatch;
