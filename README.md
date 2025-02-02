# P2P Token Trading Platform

A Telegram-based P2P trading platform for unlisted tokens with a modern dark theme interface.

## Features

- Create buy/sell orders for tokens
- View order book with price changes
- Direct Telegram messaging integration
- User rating system
- Responsive dark theme UI
- SQLite database for data persistence

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Database

The application uses SQLite for data storage. The database file (`trading.db`) will be created automatically when you first run the application. The schema includes:

- Users table: Stores user information and ratings
- Orders table: Stores all buy/sell orders
- Ratings table: Stores user-to-user ratings

## Technologies Used

- React + TypeScript
- Tailwind CSS
- SQLite (better-sqlite3)
- Lucide React for icons
- Vite for development and building

## Development

To start development:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open http://localhost:5173 in your browser

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT