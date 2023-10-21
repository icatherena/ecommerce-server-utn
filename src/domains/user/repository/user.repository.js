const { User } = require('../model/user.model');
const mongoose = require('mongoose');

module.exports.UserRepository = {
    createUser : async (data) => {
        try {
            const user = new User(data);
            await User.create(user);
            // await User.save(user);
            console.log('repo', data)
            return user; 
        }
        catch (error) {
            throw error;
        }
    },
    getAllUsers : async () => {
        try {
            const users = await User.find();
            return users;
        }
        catch (error) {
            throw error;
        }
    },
    getUserById : async (userId) => {
        try {
            const user = await User.findById(userId);
            return user;
        }
        catch (error) {
            throw error;
        }
    },
    updateUser : async (userId, data) => {
        try {
            const user = await User.findByIdAndUpdate(userId, data, { new: true }); // New set to true returns updated document
            return user;
        }
        catch (error) {
            throw error;
        }
    },
    deleteUser : async (userId) => {
        try {
            const user = await User.findByIdAndDelete(userId);
            return user; // Should I return a value or should it be void?
        }
        catch (error) {
            throw error;
        }
    }
}