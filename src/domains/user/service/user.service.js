const UserRepository = require('../repository/user.repository')

class UserService {
    async createUser (data) {
        try {
            const user = await createUser(data);
            console.log('service', data)
            return user;
        }
        catch (error) {
            throw new Error('Could not create the user')
        }
    };
    async getUserById (userId) {
        try {
            const user = await UserRepository.getUserById(userId); 
            if (user) { // Si el usuario existe, devuelve el usuario
                return user;
            }
        }
        catch (error) {
            throw new Error('User not found');
        }
    };
    async getAllUsers () {
        try {
            const users = await UserRepository.getAllUsers();
            if (users.length > 0) {
                return users;
            }
        }
        catch (error) {
            throw new Error('Have not found any user, try later');
        }
    };
    async updateUser (userId, data) {
        try {
            const user = await UserRepository.getUserById(userId); 
            if (user) { // Si el usuario existe, entonces...
                const updated = await UserRepository.updateUser(userId, data); 
                return updated;
            } else {
                throw new Error('User not found');
            }
        }
        catch (error) {
            throw new Error('Could not update user information');
        }
    };
    async deleteUser (userId) {
        try {
            const user = await UserRepository.getUserById(userId); 
            if (user) { // Si el usuario existe...
                await UserRepository.deleteUser(userId); 
            } else {
                throw new Error('User not found');
            }
        }
        catch (error) {
            throw new Error('Could not delete user');
        }
    };
};

module.exports = UserService;