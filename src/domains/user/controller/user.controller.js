const { Router } = require("express");
const User = require("../model/user.model");

const userRouter = Router();

// Obtener todos los usuarios
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).json({ message: 'Have not found any users yet. Try again later!'});            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Internal server error' });
    }
});

userRouter.get('/me', async (req, res) => {
    try {
        const { userId } = res.locals.context;
        const user = await User.findById(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Internal server error' });
    }
})

// Obtener un usuario por su userId
userRouter.get('/:otherId', async (req, res) => {
    try {
        const otherId = req.params.otherId;
        console.log(otherId);
        const user = await User.findById(otherId);
        console.log(user);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Internal server error' });
    }
})

// Crear un usuario - SignUp
/* userRouter.post('/', async (req, res) => {
    try {
        const { data } = req.body;
        const user = await User.create(data);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. User could not be created'});
    }
}); */

// Modificar datos del usuario que esta actualmente logueado
userRouter.put('/me', async (req, res) => {
    try {
        const { userId } = res.locals.context;
        const { data } = req.body;
        const user = await User.findById(userId);
        if (user) {
            const toBeUpdated = await User.findByIdAndUpdate(userId, data);
            return res.status(200).json(toBeUpdated);
        } else {
            return res.status(404).json({ message: 'Something went wrong. User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. User could not be updated'});
    }
});

// Eliminar el usuario que esta actualmente logueado
userRouter.delete('/me', async (req, res) => {
    try {
        const { userId } = res.locals.context;
        const user = await User.findById(userId);
        if (user) {
            await User.findByIdAndDelete(userId);
            return res.status(200).json(`User ${userId} successfully deleted`);
        } else {
            return res.status(404).json({ message: 'User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. User could not be deleted'});
    }
});

module.exports = {
    userRouter
};