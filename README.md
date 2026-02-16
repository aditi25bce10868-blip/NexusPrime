# Full Stack MERN Application

A complete full-stack application with React frontend and Node.js/Express backend.

## 📁 Project Structure

```
fullstack-app/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── config/
│   └── package.json
├── package.json           # Root package for scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional, uses in-memory storage by default)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fullstack-app.git
cd fullstack-app
```

2. **Install all dependencies**
```bash
npm run install-all
```

Or install separately:
```bash
npm run install-server  # Install backend dependencies
npm run install-client  # Install frontend dependencies
```

3. **Set up environment variables**

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

Create `client/.env` (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

#### Option 1: Run Both Together (Recommended)
```bash
npm run dev
```
This starts both frontend (port 3000) and backend (port 5000) concurrently.

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
# or
cd server && npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
# or
cd client && npm start
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📝 Available Scripts

### Root Level
- `npm run dev` - Run both frontend and backend concurrently
- `npm run client` - Run only frontend
- `npm run server` - Run only backend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production

### Client (Frontend)
```bash
cd client
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### Server (Backend)
```bash
cd server
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 🔌 API Endpoints

### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| GET | `/api/users` | Get all users | No |

### Item Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/items` | Get all items | No |
| GET | `/api/items/:id` | Get item by ID | No |
| POST | `/api/items` | Create new item | Yes |
| PUT | `/api/items/:id` | Update item | Yes |
| DELETE | `/api/items/:id` | Delete item | Yes |

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication.

**Flow:**
1. User registers/logs in
2. Server returns JWT token
3. Frontend stores token in localStorage
4. Token is sent in Authorization header for protected routes

## 🛠️ Tech Stack

### Frontend (Client)
- **React 18** - UI library
- **React Hooks** - State management
- **Context API** - Global state
- **CSS3** - Styling

### Backend (Server)
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database (optional)
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 🔧 Development Workflow

### Adding a New Feature

1. **Backend**: Create route → controller → model
```bash
cd server/src
# Add to routes/
# Add to controllers/
# Add to models/ (if needed)
```

2. **Frontend**: Create component → add API call
```bash
cd client/src
# Add to components/
# Update services/api.js
```

### Code Organization

**Backend Controller Example:**
```javascript
// server/src/controllers/featureController.js
exports.getFeature = async (req, res) => {
  try {
    // Your logic here
    res.json({ status: 'success', data: {} });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
```

**Frontend API Service Example:**
```javascript
// client/src/services/api.js
export const featureAPI = {
  get: () => fetchAPI('/feature'),
  create: (data) => fetchAPI('/feature', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
};
```

## 📦 Building for Production

### Build Frontend
```bash
npm run build
```
This creates an optimized production build in `client/build/`

### Serve Frontend from Backend (Optional)

Add to `server/src/server.js`:
```javascript
const path = require('path');

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
```

Then:
```bash
cd server
npm start
# App available at http://localhost:5000
```

## 🚀 Deployment

### Option 1: Deploy Separately

**Frontend (Vercel/Netlify):**
```bash
cd client
npm run build
# Deploy build folder
```

**Backend (Heroku/Railway/Render):**
```bash
cd server
git push heroku main
# or use Railway/Render dashboard
```

### Option 2: Deploy Together (Heroku)

**Procfile:**
```
web: cd server && npm start
```

**Heroku Setup:**
```bash
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Environment Variables for Production

**Server `.env`:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=super_secret_production_key
FRONTEND_URL=https://your-frontend-url.com
```

**Client `.env.production`:**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'
```

### Test Frontend
1. Open http://localhost:3000
2. Register a new account
3. Login with credentials
4. Check browser console for API calls

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Mongoose Docs**: https://mongoosejs.com

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
npx kill-port 3000

# Kill process on port 5000 (backend)
npx kill-port 5000
```

### CORS Issues
- Check `server/src/server.js` has `app.use(cors())`
- Verify `FRONTEND_URL` in backend `.env`

### MongoDB Connection Error
- Ensure MongoDB is running locally
- Or use MongoDB Atlas cloud database
- Or comment out `connectDB()` to use in-memory storage

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules
npm run install-all
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Happy Coding! 🎉
