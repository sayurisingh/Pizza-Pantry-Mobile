Pizza Pantry Mobile App
Project Overview

Pizza Pantry is a mobile application for managing pizza inventory, designed for restaurant staff or store managers. The app allows users to view inventory, manage stock levels, and interact with a demo API for product data.

Architecture & Library Choices

The app is built with React Native using Expo, and follows a modular component-based architecture for scalability and maintainability:

React Native + Expo: Cross-platform development for iOS and Android. Expo simplifies development with hot reload and easy deployment.

TypeScript: Strong typing improves code reliability and reduces runtime errors.

React Query: Manages server state and caching efficiently for API calls.

Axios: Handles HTTP requests to the API.

Jest + React Native Testing Library: Unit and integration testing of screens and components.

React Navigation: Handles navigation between screens.

State Management: Uses React Query for server state; local component state managed via React hooks.

Architecture Highlights:

Screens: Each screen represents a main feature (e.g., InventoryListScreen, ItemDetailScreen).

API Layer: Centralized API client (api/client.ts) handles all HTTP requests.

Components: Reusable UI elements such as buttons, input fields, and modals.

Hooks: Custom hooks for fetching and mutating data, keeping screens clean and focused.

API Description

The app consumes a REST API that provides pizza inventory data. If you don’t have a backend running, you can point the app to a demo API:

Base URL: https://demo-api.pizzapantry.com

Endpoints:

GET /inventory → Returns the list of items

GET /inventory/:id → Returns details for a single item

POST /inventory → Adds a new inventory item

PUT /inventory/:id → Updates an item

DELETE /inventory/:id → Deletes an item

The API client (api/client.ts) uses axios and can be easily updated to point to any API endpoint.

Known Limitations

Offline support is not implemented — the app requires an active internet connection.
Some API endpoints for adding/updating items are currently mocked for demo purposes.

Next Steps / Roadmap

Implement offline caching for inventory data

Improve error handling & UX feedback

Enhance testing coverage for edge cases

Add push notifications for inventory alerts

Integrate analytics for user behavior tracking

Setup & Run Instructions
Prerequisites

Node.js (>= 18)

npm or yarn

Expo CLI (npm install -g expo-cli)

Android Studio / Xcode for simulators (optional)

Installation
Clone the repo
cd pizza-pantry-mobile

# Install dependencies
npm install
# or
yarn install

Run the App

Start the backend server (API):
cd api
npm run dev


Start the Expo app:
cd pizza-pantry-mobile
npm start


Open the app on your iPhone:

Scan the QR code displayed in the Expo terminal or Metro bundler page using the Expo Go app on your iPhone.

Run Tests
npm test

Environment Configuration

Create a .env file based on .env.example:
API_URL=https://demo-api.pizzapantry.com

Please find screenshots of working app in the images folder. 
The main branch contains the whole project and the AppBranch contains the files for the pizza-pantry-mobile folder. 
Clone both branches and copy the files from AppBranch into the the pizza-pantry-mobile folder and then run using the above instructions. 





