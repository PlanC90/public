# Memex P2P Token Trade

A peer-to-peer trading interface for Memex tokens.

## Features

- Real-time order book display
- Buy and sell order creation
- Market cap display
- 24h volume tracking
- Price change indicators
- Automatic order cleanup after 10 days

## Running on Replit

1. Create a new Replit project
2. Choose "Node.js" as the template
3. Copy all the files from this repository to your Replit project
4. In the Replit shell, run:
   ```bash
   npm install
   ```
5. Click the "Run" button or type:
   ```bash
   npm start
   ```

The application will start and be available at your Replit URL.

## Environment Variables

No environment variables are required for this project.

## File Structure

- `server.js` - Express server implementation
- `public/` - Static files
  - `index.html` - Main HTML file
  - `app.js` - Frontend JavaScript
  - `styles.css` - CSS styles
- `buy.json` - Buy orders storage
- `sell.json` - Sell orders storage

## License

MIT
