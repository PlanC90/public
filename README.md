# Telegram Bot Management App

This is a React-based web application for managing a Telegram bot. It allows administrators to:

- View key statistics about the bot's usage.
- Manage user profiles and balances.
- Moderate submitted links.
- Configure bot settings.

## Setup

1.  Import the project to Glitch.
2.  Glitch should automatically install the dependencies. If not, open the console and run `npm install`.
3.  The application should automatically start. If not, run `npm start` in the console.

## Data Storage

The application stores data in JSON files within the `data/` directory.

## API Endpoints

-   `/api/save`: Saves JSON data to a file.
-   `/data/*`: Serves static JSON data files.
