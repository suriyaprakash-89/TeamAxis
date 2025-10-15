import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  nodemailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  google: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
  },
};
