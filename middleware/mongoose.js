// middleware/connectDB.js
import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.');
    return handler(req, res);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
    return handler(req, res);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return res.status(500).json({ message: 'Database connection error' });
  }
};

export default connectDB;
