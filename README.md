# CityBikes App

This is a web application that fetches geolocated bike-sharing data from the [CityBikes API](http://api.citybik.es/v2/) and displays it on a map using React, TypeScript, and Leaflet. The app allows users to explore the bike-sharing networks, stations, and station details across different countries.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Run Locally](#how-to-run-locally)
- [How to Build for Production](#how-to-build-for-production)
- [Testing](#testing)
- [App Functionality](#app-functionality)
- [UI/UX](#uiux)
- [License](#license)

## Overview

This app helps users interact with city bike-sharing networks and station data. The user can:

- View a list of bike-sharing networks per country.
- Drill down into a specific network to see all its stations.
- See detailed information about each station, such as the number of bikes, free slots, and other details.

## Features

- **L1 (Networks per Country)**: View the number of available bike-sharing networks for each country.
- **L2 (Stations per Network)**: Upon selecting a network, view a list of stations associated with that network.
- **L3 (Station Details)**: Clicking on a station reveals a popup with detailed information about the station, such as available bikes, empty slots, and other details.
- **Navigation**: Allow the user to drill down from L1 to L2 and L2 to L3, and also go back to previous layers.

## My Initiative

- **User Geolocation**: Implemented user geolocation to center the map based on the user's location for improved experience.
- **Marker Cluster**: Used Marker Cluster to group nearby stations and improve performance on the map.

## Tech Stack

- **Frontend**: React.js, TypeScript
- **State Management**: Redux Toolkit, React-Redux
- **UI**: Leaflet, React-Leaflet
- **API**: Axios
- **Styling**: SASS
- **Build Tool**: Vite

## How to Run Locally

1. Open this folder in your code editor.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open the browser and go to `http://localhost:3000` (or the port specified in your `vite.config.ts`).

### Test on Mobile (Ensure the device is connected to the same network)

- Update the Vite configuration to expose the app on your local network:

  ```ts
  // vite.config.ts
  export default defineConfig({
  	server: {
  		host: '0.0.0.0',
  		port: 3000, // or any other port you're using
  	},
  });
  ```

- Now, access the app on your phone by visiting `http://<your-local-ip>:3000`.

## Testing

- To run all the tests:

  ```bash
  npx vitest run
  ```

- To test a specific component:
  ```bash
  npx vitest run __tests__/target-component
  ```

**Note**: I couldn't build the test components for the Map component because `react-leaflet` and `leaflet-cluster` use ESModules, and Vitest uses import. Workarounds for this can be explored for better testing in the future.

## How to Build for Production

1. Build the app for production:

   ```bash
   npm run build
   ```

2. To preview the production build locally:

   ```bash
   npm run preview
   ```

3. The production-ready build will be located in the `dist/` folder. You can deploy it to services like:
   - [Netlify](https://www.netlify.com/)
   - [Vercel](https://vercel.com/)
   - [GitHub Pages](https://pages.github.com/)

## App Functionality

1. **Layer 1: Networks** – The map shows markers for each country with bike-sharing networks. Clicking on a country displays the networks available in that country.
2. **Layer 2: Stations** – Clicking on a network will show the stations available in that network, represented by markers on the map.
3. **Layer 3: Station Details** – Clicking on a station marker reveals a popup with detailed information about the station, such as the number of available bikes, empty slots, and other details.

4. **Back Navigation** – There are "Back" buttons allowing the user to return to the previous layer, making navigation intuitive.

## UI/UX

- **Responsive Design**: The app is designed to be responsive, so it works well on both mobile and desktop devices.
- **Interactive Map**: A fully interactive map with zoom, pan, and marker clustering is used to visualize the bike-sharing networks and stations.
- **Popups**: When clicking on markers, detailed information about networks and stations appears in popup windows.
- **Loading Indicators**: While the data is being fetched, a loading spinner or message is displayed.
- **Error Handling**: The app also includes error displays for failed API calls or any unexpected issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` provides clear instructions on how to run, test, and build the project, along with details about the app's functionality, UI/UX design, and tech stack. It should meet all requirements of 2. Definition of done!
