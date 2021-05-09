require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(bodyParser.urlencoded({ extended: true }))

// Setting CORS Policy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Header', '*')
  next()
})

// Setting input file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
})
const imageFilter = (req, file, cb) => {
  const type = file.mimetype
  if(type === 'image/png' || type === "image/jpg" || type === "image/jpeg"){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
app.use(multer({storage: fileStorage, fileFilter: imageFilter}).single('image'));

// Route
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) });