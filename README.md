
# EasyLayzee

EasyLayzee is a full-stack MERN e-commerce web application designed for browsing and purchasing snack products such as wafers and chips. The project includes separate user and admin experiences, making it suitable for both customers and store administrators. The user experience allows customers to explore the product catalog, add items to their cart, and complete purchases securely. On the other hand, the admin experience provides store administrators with tools to manage inventory, process orders, and monitor sales performance. This project demonstrates proficiency in full-stack development using the MERN stack (MongoDB, Express.js, React.js, Node.js) and showcases the ability to create a functional e-commerce platform with distinct user roles.

## Description

This application allows users to:
- create an account and log in securely
- browse products and view product details
- add items to the cart and manage quantities
- proceed through a checkout/payment flow
- view their purchased items

Administrators can:
- log in to an admin panel
- add, update, and delete products
- view admin-specific product data
- manage the store inventory

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose
- Authentication: JWT + cookies
- File Uploads: Cloudinary, Multer
- Other: CORS, dotenv, bcryptjs

## Features

- User registration and login
- Admin authentication and dashboard access
- Product listing and detailed product view
- Cart management with add/update/remove actions
- Checkout and payment page flow
- Product management for admins
- Protected routes for users and admins

## Folder Structure

```bash
EASY_LAYZEE/
├── backend/
│   ├── controllers/
│   │   ├── adminController.js       # register, login, getMe
│   │   ├── userController.js    # create, list, checkout, cancel
│   │   ├── productController.js    # create, list, checkout, cancel
│   │   └── cartController.js      # CRUD + seed slots
│   │
│   ├── middlewares/
│   │   ├── admin.mid.js    # create, list, checkout, cancel
│   │   └── user.mid.js      # CRUD + seed slots
│   │ 
│   ├── models/
│   │   ├── admin.model.js       # register, login, getMe
│   │   ├── user.model.js    # create, list, checkout, cancel
│   │   ├── product.model.js    # create, list, checkout, cancel
│   │   ├── purchase.model.js
│   │   └── cart.model.js      # CRUD + seed slots
│   │ 
│   ├── routes/
│   │   ├── admin.route.js       # register, login, getMe
│   │   ├── user.route.js    # create, list, checkout, cancel
│   │   ├── product.route.js    # create, list, checkout, cancel
│   │   └── cart.route.js      # CRUD + seed slots
│   │ 
│   ├── .env                        # environment variables (not committed)
│   ├── config.js
│   ├── index.js                    # Express entry point
│   ├── package-lock.json
│   └── package.json
│ 
├── frontend/
│   ├── public/
│   │   ├── wafers/
│   │   │
│   │   ├── favicon.svg
│   │   └── icons.scg 
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AdminNavbar.jsx
│   │   │   └── UserNavbar.jsx
│   │   │   
│   │   ├── context/
│   │   │   ├── AdminContext.jsx
│   │   │   └── UserContext.jsx
│   │   │   
│   │   ├── data/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── user/
│   │   │   │
│   │   │   └── NotFound.jsx
│   │   │   
│   │   ├── routes/
│   │   │   ├── AdminRoute.jsx
│   │   │   └── UserRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │ 
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │  
│   ├── .env                        # environment variables (not committed)
│   ├── eslint.config.js
│   ├── index.html                    
│   ├── vite.config.js                    
│   ├── package-lock.json
│   └── package.json 
│ 
├── .gitignore
│ 
├── LICENSE 
└── README.md
```

## Installation

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd EASY_LAYZEE
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm start
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

## API Base URL

```bash
http://localhost:5000/api/v1
```

## Screenshots

Screenshots will be added soon.

## Future Roadmap

- improve the payment experience
- add order history and tracking
- implement product search and filters
- add wishlist and reviews
- improve UI/UX and responsiveness

## Author

Md Ajmal Hussain
