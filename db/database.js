const mongoose = require('mongoose');

require('dotenv').config();

const db = process.env.MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = () => {
    return mongoose.connect(db, options);
}

module.exports = connectDB;