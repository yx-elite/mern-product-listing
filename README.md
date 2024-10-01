# MERN Product Listing API

This project is a RESTful API for managing product listings using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Create, Read, Update, and Delete (CRUD) operations for products
- MongoDB integration for data persistence
- Express.js server with RESTful routes
- Environment variable configuration using dotenv

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or later recommended)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yx-elite/mern-product-listing.git
   cd mern-product-listing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   ```

## Usage

To start the development server:

```
npm run dev
```

The server will start running at `http://localhost:5000`.

## API Endpoints

- **GET /api/products**: Retrieve all products
- **POST /api/products**: Create a new product
- **PUT /api/products/:id**: Update a product by ID
- **DELETE /api/products/:id**: Delete a product by ID
