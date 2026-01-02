import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

// Ensure config is loaded before anything else
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
