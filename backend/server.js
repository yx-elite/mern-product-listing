import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json());    // Allow us to send JSON data in request body

app.use('/api/products', productRoutes);

app.listen(5000, () => {
  connectDB();    // Initialize connection to MongoDB
  console.log('Server is running on at http://localhost:5000');
});
