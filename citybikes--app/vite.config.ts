import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom', // Use jsdom to simulate the browser environment
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
		testTransformMode: {
			web: ['js', 'ts', 'jsx', 'tsx'],
		},
	},
	esbuild: {
		target: 'esnext', // Adjust the target here if needed
	},
});
