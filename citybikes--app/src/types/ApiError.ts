// Custom error class for handling API-related errors

// Error message and status code
export class ApiError extends Error {
	constructor(message: string, public status: number) {
		super(message); // Calls the parent class constructor to set the error message
		this.name = 'ApiError'; // Custom error name for easier identification
	}
}
