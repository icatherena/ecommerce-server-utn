const { MongoClient } = require('mongodb');

require('dotenv').config();

const db = process.env.MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(db, options);

export const connectDB = async () => {
    try {
        await client.connect();
        console.info('Connected to DB');
        return client.db();
    } catch (error) {
        console.log('Error connecting to DB: ', error);
        throw error;
    }
}