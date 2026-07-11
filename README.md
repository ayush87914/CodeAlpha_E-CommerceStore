# 🛍️ BazaarHub — Full Stack E-Commerce Store

A complete full-stack e-commerce web application built as part of the **CodeAlpha Full Stack Development Internship**. BazaarHub lets users browse products, manage a shopping cart, place orders, and customize their profile — all backed by a real database and secure authentication.

**🔗 Live Demo:** [https://e-commerce-store-hbxe.onrender.com](https://e-commerce-store-hbxe.onrender.com)

> ⚠️ Hosted on a free-tier server — the app may take 30–50 seconds to wake up on first visit if it's been inactive.

---

## ✨ Features

- 🔐 **User Authentication** — secure registration & login with hashed passwords (bcrypt) and JWT-based sessions
- 🛒 **Shopping Cart** — add, update quantity, and remove items in real time
- 📦 **Product Catalog** — dynamic product listing pulled from the database, with detail pages
- 💳 **Order Processing** — full checkout flow with shipping details, saved to the database
- 👤 **User Profile** — logged-in users can view and update their profile
- 🎨 **Polished, Animated UI** — responsive, colorful storefront inspired by Amazon/Flipkart-style design
- 📊 **Live Cart Badge** — cart item count updates instantly across the dashboard

---

## 🧰 Tech Stack

**Frontend**
- HTML5, CSS3 (custom animations & gradients), Vanilla JavaScript

**Backend**
- Node.js
- Express.js
- JWT (`jsonwebtoken`) for authentication
- `bcrypt` for password hashing

**Database**
- MySQL (via `mysql2`)
- Hosted on [TiDB Cloud](https://tidbcloud.com) (MySQL-compatible, serverless)

**Deployment**
- [Render](https://render.com) — free web service hosting
- [TiDB Cloud](https://tidbcloud.com) — free serverless MySQL database

---

## 📁 Project Structure

```
ecommerce/
├── config/
│   └── db.js                # MySQL connection setup
├── controllers/
│   ├── authController.js    # Register, login, profile
│   ├── cartController.js    # Cart CRUD operations
│   ├── orderController.js   # Order placement & history
│   └── productController.js # Product listing & detail
├── middleware/
│   └── auth.js              # JWT verification middleware
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── cartModel.js
│   └── orderModel.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── public/
│   ├── css/style.css        # Styling & animations
│   └── js/                  # Frontend logic (app.js, cart.js, auth.js, nav.js...)
├── views/
│   ├── index.html            # Dashboard
│   ├── login.html
│   ├── register.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   └── profile.html
├── sql/
│   └── ecommerce.sql         # Database schema + seed data
├── server.js
└── package.json
```

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `users` | Registered user accounts |
| `products` | Product catalog (name, price, image, stock) |
| `cart` | Items in each user's cart |
| `orders` | Placed orders with shipping details |
| `order_items` | Line items belonging to each order |

---

## ⚙️ Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org) installed
- A MySQL server (local or cloud)

### 1. Clone the repository
```bash
git clone https://github.com/ayush87914/CodeAlpha_E-CommerceStore.git
cd CodeAlpha_E-CommerceStore
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database
Import the schema and seed data:
```bash
mysql -u root -p < sql/ecommerce.sql
```

### 4. Configure environment variables
Create a `.env` file in the root folder:
```
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce

JWT_SECRET=your_random_secret_key
```

### 5. Run the app
```bash
npm run dev
```
Visit **http://localhost:3000** in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Create a new account | ❌ |
| POST | `/api/auth/login` | Log in and receive a token | ❌ |
| GET | `/api/auth/profile` | Get current user's profile | ✅ |
| PUT | `/api/auth/profile` | Update profile name | ✅ |
| GET | `/api/products` | List all products | ❌ |
| GET | `/api/products/:id` | Get a single product | ❌ |
| GET | `/api/cart` | Get current user's cart | ✅ |
| GET | `/api/cart/count` | Get cart item count | ✅ |
| POST | `/api/cart/add` | Add item to cart | ✅ |
| PUT | `/api/cart/:id` | Update item quantity | ✅ |
| DELETE | `/api/cart/:id` | Remove item from cart | ✅ |
| POST | `/api/orders` | Place an order from the cart | ✅ |
| GET | `/api/orders` | Get user's order history | ✅ |

---

## 🚀 Deployment

This project is deployed using a free-tier stack:

1. **Database:** [TiDB Cloud](https://tidbcloud.com) Serverless (MySQL-compatible, SSL-secured)
2. **Backend hosting:** [Render](https://render.com) Web Service, auto-deployed from this GitHub repository

Environment variables are configured directly in the Render dashboard (never committed to the repo).

---

## 📜 About This Project

This project was built as part of the **CodeAlpha Full Stack Development Internship**, fulfilling Task 1: *"Build a basic e-commerce site with product listings, shopping cart, product details page, order processing, and user registration/login."*

---

## 📄 License

This project is open source and available for learning purposes.

---

## 👤 Author

**Ayush**
GitHub: [@ayush87914](https://github.com/ayush87914)
