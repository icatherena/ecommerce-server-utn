const connectDB = require('../../../../db');

export const UserRepository = {
    getAllUsers : async () => {
        try {
            const db = await connectDB();
            const userCollection = db.collection('user');
            const users = userCollection.find().toArray();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
}