const express = require('express');
//const connectDB = require('../db/database');
const mongoose = require('mongoose');

const router = require('./router/index');

require('dotenv').config();

const app = express();

const db = process.env.MONGODB_URI;
const port = process.env.PORT;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use(express.json());

app.use('/api', router);

const startServer = async () => {
    try {
        await mongoose.connect(db, options)
        .then(() => {
            console.log('It worked!')
            app.listen(port, () => {
                console.log(`Server is listening on port ${port}`);
            })
        })
    }
    catch (error) {
        console.log('Something went wrong', error);
    }
}

startServer();