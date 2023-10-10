const express = require('express');

const { router } = require('./router');

require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use('/api', router);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log('Error starting server:', error);
    }
}

startServer();