# Film Favorit API

RESTful API untuk manajemen film favorit dengan autentikasi JWT dan authorization berbasis user.

## 🚀 Live Demo

**Base URL:** `https://film-favorit-api-production.up.railway.app/films`

## ✨ Features

- ✅ User Authentication (Register & Login dengan JWT)
- ✅ JWT Token Authorization
- ✅ CRUD Operations untuk Film
- ✅ User-Film Ownership (User hanya bisa edit/delete film mereka sendiri)
- ✅ Protected Routes dengan Middleware
- ✅ Password Hashing dengan Bcrypt
- ✅ MongoDB Database dengan Mongoose

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** Bcrypt
- **Environment Variables:** dotenv

## 📚 API Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "payload": {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@mail.com"
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@mail.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "payload": {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "token": "eyJhbGci...",
      "user": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@mail.com"
      }
    }
  }
}
```

### Films (Public)

#### Get All Films
```http
GET /films
```

#### Get Film by ID
```http
GET /films/:id
```

### Films (Protected - Require JWT Token)

#### Create Film
```http
POST /films
Authorization: Bearer {token}
Content-Type: application/json

{
  "judul": "Spiderman",
  "author": "Sam Raimi",
  "genre": "Action",
  "rating": 8.5
}
```

#### Update Film (Owner Only)
```http
PUT /films/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "judul": "Spiderman 2",
  "author": "Sam Raimi",
  "genre": "Action",
  "rating": 9.0
}
```

#### Delete Film (Owner Only)
```http
DELETE /films/:id
Authorization: Bearer {token}
```

## 🚦 Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request berhasil |
| 201 | Created - Resource berhasil dibuat |
| 400 | Bad Request - Data tidak valid |
| 401 | Unauthorized - Token tidak ada/invalid |
| 403 | Forbidden - Tidak punya akses (bukan pemilik) |
| 404 | Not Found - Resource tidak ditemukan |
| 500 | Internal Server Error - Error di server |

## 🔒 Authorization

Endpoint yang di-protect membutuhkan JWT token di header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Flow:**
1. Register user baru atau login
2. Simpan token dari response
3. Sertakan token di header untuk endpoint protected

## 💾 Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Film
```javascript
{
  judul: String (required),
  author: String (required),
  genre: String (required),
  rating: Number (default: 0),
  createdBy: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🏃 Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone repository
```bash
git clone https://github.com/YOUR-USERNAME/film-favorit-api.git
cd film-favorit-api
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables

Create `.env` file:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/yourDatabaseName
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

4. Run server
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📁 Project Structure
```
film-favorit-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   └── filmController.js    # Film CRUD logic
├── middlewares/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Film.js              # Film schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── filmRoutes.js        # Film endpoints
├── utils/
│   └── response.js          # Standardized response helper
├── .env.example             # Environment variables template
├── .gitignore
├── app.js                   # Main application file
├── package.json
└── README.md
```

## 🧪 Testing

Gunakan Postman atau cURL untuk test API.

**Postman Collection:** [Link to collection] (opsional)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**Your Name**
- GitHub: [@nurfitriyani8527-lab](https://github.com/nurfitriyani8527-lab)
- LinkedIn: [Nur Fitri Yani](https://www.linkedin.com/in/nur-fitri-yani-80285b334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

## 🙏 Acknowledgments

- Inspired by RESTful API best practices
- Built with Express.js and MongoDB
