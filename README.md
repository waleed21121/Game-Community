# Game Community API

Game Community API is a backend service designed for gamers. It allows users to manage their game collections, search for games, interact with third-party gaming APIs, and connect with other gamers.

## Features
- Search for games by name and ID
- Search for Steam games by app ID
- Add games to favorites
- Write and manage game reviews
- Organize games into categories: 
  - `Currently playing`, `Played`, `Plan To Play`, `Dropped`, `Completed`, `On Hold`, `Multiplayer`
- Search for user profiles
- Search for games and filter by category
- Search for user reviews and favorites
- Register with a user profile
- Link a Steam ID to a user profile

## Tech Stack
- **Express.js** – Web framework for Node.js
- **Axios** – Handles API requests to third-party services
- **Mongoose** – ODM for MongoDB
- **bcrypt** – Hashing passwords for authentication
- **jsonwebtoken** – Generating and verifying JWTs for authentication
- **express-validator** – Middleware for request validation
- **express-rate-limit** – Rate limiting to prevent abuse and limit repeated requests
- **nodemon** – Automatically restarts the server during development
- **dotenv** – Manages environment variables

## Third-Party API Integrations
- **IGDB** – Fetch game details
- **Steam Powered API** – Retrieve Steam game details and user libraries
- **ProtonDB** – Verify game details

## Installation

### Prerequisites
- Node.js installed
- MongoDB instance running

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/waleed21121/Game-Community.git
   cd Game-Community
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (see below).
4. Start the server:
   ```sh
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory and define the following variables:

```env
PORT=5000
DATABASE_URL=mongodb+srv://your-mongodb-uri
CLIENT_ID=your_igdb_client_id
CLIENT_SECRET=your_igdb_client_secret
ACCESS_TOKEN=your_igdb_access_token
STEAM_API_KEY=your_steam_api_key
PUBLIC_KEY=your_public_key
PRIVATE_KEY=your_private_key
```

## API Endpoints

### User API
- **GET /api/users/** – Get all users
- **POST /api/users/login** – Login and get a JWT token
- **POST /api/users/register** – Register a new user
- **GET /api/users/:id** – Get user by ID
- **GET /api/users/:id/steam-games** – Get Steam games of a user

### Games API
- **GET /api/games/** – Get all games
- **GET /api/games/:id** – Get details of a specific game
- **GET /api/games/steam/game/:id** – Get Steam details of a game

### User Games API
- **GET /api/user-games/:id** – Get all games of a user
- **POST /api/user-games/:id** – Add a game for a user
- **PATCH /api/user-games/:id** – Edit status of a game for a user
- **DELETE /api/user-games/:id** – Delete a game for a user
  - Game ID or status must be provided in the request body

### Game Reviews API
- **GET /api/game-reviews/:id** – Get all reviews for a game
- **POST /api/game-reviews/:id** – Add a new review for a game
- **PATCH /api/game-reviews/:gameId/:reviewId** – Edit a review
- **DELETE /api/game-reviews/:gameId/:reviewId** – Delete a review

### Favorite Games API
- **GET /api/favorite-games/:id** – Get favorite games of a user
- **POST /api/favorite-games/:id** – Add a game to a user's favorites
- **DELETE /api/favorite-games/:id** – Remove a game from favorites

## Additional Features
- **Pagination, Sorting, and Filtering**
  - All APIs support pagination, sorting, and filtering through query parameters.
- **Authentication & Authorization**
  - All endpoints (except login, register, and public game data) require a JWT token for access.
- **Rate Limiting**
  - Protects the API from excessive requests using `express-rate-limit`

## License
This project is licensed under the MIT License.

## Author
[Waleed21121](https://github.com/waleed21121)