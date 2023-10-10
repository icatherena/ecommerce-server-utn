const UserRepository = require('../repository')

export const UserService = {
    getAllUsers : async () => {
        try {
            const users = await UserRepository.getAllUsers();
            if (users.length > 0) {
                return users;
            }
        }
        catch (error) {
            throw error
        }
    }
};