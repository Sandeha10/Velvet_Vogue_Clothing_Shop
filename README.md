# 🛍️ Velvet Vogue — Luxury Apparel E-Commerce Platform

Velvet Vogue is a full-stack, responsive digital fashion storefront engineered with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). Designed around modern human-computer interaction (HCI) standards and the **CRAP** design paradigm (Contrast, Repetition, Alignment, Proximity), it delivers a seamless, high-end shopping experience alongside an administrative management suite.

---

## Key Features

###  Customer Experience
* **Product Catalog & Filtering:** Dynamic browsing categorized by gender, clothing type, sizes, and color palettes.
* **Stateful Shopping Cart:** Persistent cart context allowing instant quantity updates and real-time subtotal/shipping calculations.
* **Multi-Step Secure Checkout:**
  * **Step 1:** Review selected items, variations, and quantities.
  * **Conditional Auth Gate:** Unauthenticated users attempting checkout are intercepted with a visual security alert banner and auto-redirected to login.
  * **Step 2:** Shipping details collection (address, city, contact) combined with simulated card payment processing.
* **Customer Dashboard & Order History:** Dedicated profile portal for shoppers to review real-time order history, tracking statuses, and invoice breakdowns.
* **Contact & Support Channel:** Direct customer inquiry dispatch system connected to the admin console.

###  Role-Based Admin Management
* **Inventory Control:** Form interface to upload new apparel with multi-size selections, comma-separated color arrays, pricing, and image URLs.
* **Store Management:** Inline product price and name modification, along with deletion triggers.
* **Customer Support Inquiries:** Centralized inbox displaying customer questions with timestamped records.
* **Order Transaction Logs:** Live feed of MongoDB order transactions, displaying order IDs, timestamps, items manifest, and gateway statuses.

---

##  Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18+ (Vite) | Component-driven SPA architecture |
| **Styling** | Tailwind CSS / Custom CSS | Luxury palette (Deep Charcoal `#111` & Velvet Burgundy/Gold) |
| **Icons** | Lucide React | Modern visual indicators |
| **Routing** | React Router DOM (v6) | Declarative client-side routing |
| **HTTP Client** | Axios | Async REST API communication with JWT interceptors |
| **Backend** | Node.js & Express.js | Modular RESTful API backend architecture |
| **Database** | MongoDB & Mongoose ODM | Document-based schema modeling |
| **Authentication**| JSON Web Tokens (JWT) & bcryptjs | Token-based stateless authentication |

---

##  Project Structure


Velvet-Vogue/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & admin verification middlewares
│   ├── models/             # Mongoose schemas (User, Product, Order, Inquiry)
│   ├── routes/             # REST endpoint route handlers
│   ├── .env.example
│   ├── package.json
│   └── server.js           # Express entry point
│
└── frontend/
    ├── public/             # Static assets
    ├── src/
    │   ├── assets/         # Images & design icons
    │   ├── components/     # Reusable UI widgets (Navbar, Footer, Modals)
    │   ├── context/        # CartContext & state providers
    │   ├── pages/          # Primary page views (Home, Shop, Cart, Dashboard)
    │   ├── App.jsx         # App router & layout shell
    │   └── main.jsx        # DOM mount point
    ├── index.html
    ├── package.json
    └── vite.config.js



