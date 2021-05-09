require('dotenv').config();
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const productData = require('./data/product');
const User = require('./models/User');
const Product = require('./models/Product');

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(productData);

        await User.deleteMany({role:"admin"});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash("admin123", salt);
        await User.insertMany(
            {
                name: "Admin dummy",
                email: "admin@gmail.com",
                password: hashPassword,
                role: "admin",
                photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
            }
        );

        console.log("Data import Success");

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

importData();