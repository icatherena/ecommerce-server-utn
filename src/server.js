const express = require('express');
const cors = require('cors'); 
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

/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173, https://invert-box-ecommerce.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // If using credentials
    next();
}); */

app.use(cors({
    origin: ['http://localhost:5173', 'https://invert-box-ecommerce.netlify.app', 'https://ecommerce-utn-six.vercel.app/'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

app.options('*', cors());

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