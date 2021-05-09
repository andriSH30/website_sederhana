require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("MongoDB connection success");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;