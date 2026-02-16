# My Backend Project

A RESTful API built with Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication with JWT
- 📝 CRUD operations for items
- 🛡️ Protected routes with middleware
- 🗄️ MongoDB integration (optional)
- ✅ Input validation
- 🔄 CORS enabled
- 📦 In-memory storage fallback

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (optional)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional, uses in-memory storage by default)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-backend-project.git
cd my-backend-project
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your_secret_key
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### User Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| GET | `/api/users` | Get all users | No |

### Item Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/items` | Get all items | No |
| GET | `/api/items/:id` | Get item by ID | No |
| POST | `/api/items` | Create new item | Yes |
| PUT | `/api/items/:id` | Update item | Yes |
| DELETE | `/api/items/:id` | Delete item | Yes |

## API Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Items (with auth)
```bash
curl http://localhost:5000/api/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Item",
    "description": "Item description",
    "price": 99.99,
    "category": "Electronics"
  }'
```

## Project Structure

```
my-backend-project/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── itemController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── itemRoutes.js
│   └── server.js
├── config/
│   └── database.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret for JWT signing | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## Using with MongoDB

To enable MongoDB:

1. Install and run MongoDB locally, or use MongoDB Atlas
2. Uncomment the database connection in `src/server.js`:
```javascript
connectDB();
```
3. Update controllers to use Mongoose models instead of in-memory storage

## Connecting with React Frontend

1. Update React `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

2. Example fetch in React:
```javascript
const response = await fetch('http://localhost:5000/api/items', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Deployment

### Heroku

```bash
heroku create my-backend-app
git push heroku main
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
```

### Railway / Render

1. Connect your GitHub repo
2. Add environment variables
3. Deploy

## Testing

Test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Your React frontend

## License

MIT
