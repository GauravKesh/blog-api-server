# 📰 Blog API Server

A scalable, production-ready REST API built with Node.js, Express, and MongoDB. Supports full CRUD operations for blog posts, status-based filtering, slug generation, and pagination.

## ✨ Features

- 🚀 **RESTful API endpoints** - Clean, intuitive API design
- 📄 **Pagination & filtering** - Efficient data retrieval with query parameters

- 🛡️ **Robust error handling** - Comprehensive error responses and validation
- 🗄️ **MongoDB with Mongoose** - Reliable data persistence with ODM
- 🌐 **CORS enabled** - Cross-origin resource sharing support
- ⚙️ **Environment configuration** - Secure configuration management
- 🏗️ **Clean architecture** - Modular, maintainable codebase

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Next.js** | React framework|
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin resource sharing |

## 📋 API Endpoints

**Base URL:** `http://localhost:9090/api`

### Posts Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/posts` | Get all posts (paginated) | `page`, `limit`, `status` |
| `GET` | `/posts/:id` | Get a specific post by ID | - |
| `POST` | `/posts` | Create a new post | - |
| `PUT` | `/posts/:id` | Update an existing post | - |
| `DELETE` | `/posts/:id` | Delete a post | - |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health status |

### Example Requests

```bash
# Get paginated posts
GET /api/posts

# Get a specific post
GET /api/posts/507f1f77bcf86cd799439011

# Health check
GET /api/health
```

## 📊 Data Model

### Post Schema (`/models/Post.js`)

```javascript
{  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone & Install

```bash
git clone https://github.com/gauravkesh/blog-api-server.git
cd blog-api-server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=9090
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/blog-app

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

Make sure MongoDB is running on your system:

```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Ubuntu/Debian
sudo systemctl start mongod

# For Windows
net start MongoDB
```
### 4. Run the  Backend Server

```bash
# Development mode (with auto-restart)
npm run backend:dev

# Production mode
npm run backend
```

### 5. Run the Frontend Server

```bash
# Development mode (with auto-restart)
npm run dev

```



The server will be available at: **http://localhost:9090**

## 🧪 API Usage Examples

### Create a New Post

```http
POST /api/posts
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful JavaScript runtime that allows you to build server-side applications...",
  "author": "John Doe",
  "status": "published",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Response:**
```json
{
    "message": "Post created successfully",
    "post": {
        "title": "Getting Started with Node.js",
        "content": "Node.js is a powerful JavaScript runtime that allows you to build server-side applications...",
        "author": "John Doe",
        "status": "published",
        "tags": [
            "nodejs",
            "javascript",
            "backend"
        ],
        "_id": "685476716c10c9ecdbc5b2b8",
        "createdAt": "2025-06-19T20:43:29.185Z",
        "updatedAt": "2025-06-19T20:43:29.189Z",
        "slug": "getting-started-with-nodejs",
        "__v": 0
    }
}


```

### Update a Post

```http
PUT /api/posts/507f1f77bcf86cd799439011
Content-Type: application/json

{
 "author": "Gaurav kesh",
}
```

- **Response:**
```json
{
    "message": "Post updated successfully",
    "post": {
        "_id": "685476716c10c9ecdbc5b2b8",
        "title": "Getting Started with Node.js",
        "content": "Node.js is a powerful JavaScript runtime that allows you to build server-side applications...",
        "author": "Gaurav kesh",
        "status": "published",
        "tags": [
            "nodejs",
            "javascript",
            "backend"
        ],
        "createdAt": "2025-06-19T20:43:29.185Z",
        "updatedAt": "2025-06-19T20:49:51.522Z",
        "slug": "getting-started-with-nodejs",
        "__v": 0
    }
}
```
### Get Posts 

```http
GET /api/posts
```

**Response:**
```json
{
    "posts": [],
    "totalPages": 1,
    "currentPage": 1,
    "total": 31
}
```

### Delete a Post

```http
DELETE /api/posts/507f1f77bcf86cd799439011
```
**Response**
```json
{
    "message": "Post deleted successfully"
}
```


## 📁 Project Structure

```
blog-api-server/
.
├── app
│   ├── blogs
│   │   └── page.tsx
│   ├── create-post
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend
│   ├── api
│   │   ├── controllers
│   │   │   └── postControllers.js
│   │   └── routes
│   │       └── postRoutes.js
│   ├── models
│   │   └── Post.js
│   └── server.js
├── components
│   └── ui/
│      
├── components.json
├── hooks
│   └── use-toast.ts
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── CreatePostPage.tsx
│   ├── Footer.tsx
│   ├── HomePage.tsx
│   ├── Navbar.tsx
│   └── PostsPage.tsx
├── postcss.config.js
├── readme.md
├── tailwind.config.ts
└── tsconfig.json
```



### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `404` | Not Found |
| `422` | Validation Error |
| `500` | Internal Server Error |

## 🌐 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=9090
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
CORS_ORIGIN=https://yourdomain.com
```



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or run into issues:

- 📧 Email: gkrcoder@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/gauravkesh/blog-api-server/issues)

---

**Made with ❤️ by [Gaurav Kesh Roushan](https://github.com/gauravkesh)**