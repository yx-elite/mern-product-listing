import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const createProduct = async (req, res) => {
  const product = await req.body;    // User send product data in request body

  if (!product.name || !product.image || !product.description || !product.price) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.log("Error in creating product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}