
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Game Community API',
            version: '1.0.0',
            description: 'Welcome to the **Games Community API**, a dynamic interface crafted to empower a thriving gaming ecosystem.\n' +
                   '# Overview\n' +
                   'This API enables users to explore games, manage personal libraries, submit reviews, and curate favorite titles—all seamlessly integrated with leading third-party services.\n' +
                   '# Third-Party Integrations\n' +
                   '- **IGDB (Internet Game Database)**: Delivers detailed game metadata (titles, genres, descriptions).\n' +
                   '- **Steam**: Provides game data, user library syncing, and profile integration.\n' +
                   '- **Proton**: Offers compatibility insights for non-Windows platforms (e.g., Linux via Steam Deck).\n' +
                   '# Key Features\n' +
                   '- **Games Management**: Browse all games, fetch details, or access Steam game data with IGDB and Steam metadata.\n' +
                   '- **User Game Tracking**: Add, update, or remove games with status tracking (e.g., "Currently playing") and Steam syncing.\n' +
                   '- **User Authentication & Management**: Register, log in, and update profiles, secured with JWT.\n' +
                   '- **Game Reviews**: Post, update, or delete reviews with ratings (1-5), powered by community and third-party data.\n' +
                   '- **Favorite Games**: Curate a list of favorites with validation against IGDB, Steam, and Proton data.\n' +
                   '# Security\n' +
                   'All user-specific endpoints are protected with **JWT authentication** for secure access.\n' +
                   '# Purpose\n' +
                   'Build game discovery platforms, trackers, or community hubs with this API’s local and third-party capabilities.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        name: { type:'string' },
                        email: { type:'string' },
                        password: { type:'string' },
                        steamId: { type:'string' },
                    },
                    required: ['name', 'email', 'password', 'steamId']
                },
                UserGames: {
                    type: 'object',
                    properties: {
                        userId: { type:'string' },
                        gameId: { type:'number' },
                        status: { type:'string' },
                    },
                    required: ['userId', 'gameId', 'status']
                },
                FavoriteGames: {
                    type: 'object',
                    properties: {
                        userId: { type:'string' },
                        gameId: { type:'number' },
                    },
                    required: ['userId', 'gameId']
                },
                GameReviews: {
                    type: 'object',
                    properties: {
                        userId: { type:'string' },
                        gameId: { type:'number' },
                        content: { type:'string' },
                        rating: { type:'number' },
                        createdAt: { type:'Date' }
                    },
                    required: ['userId', 'gameId', 'content', 'rating']
                }
            },
            responses: {
                Unauthorized: {
                    description: 'Unauthorized',
                },
                NotFound: {
                    description: 'Not Found',
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            { bearerAuth: [] }
        ]
    },
    apis: ['./routes/*.js', './swagger/*.yaml']
}

module.exports = swaggerOptions;