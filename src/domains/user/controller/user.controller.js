const { Router } = require("express");
const UserService = require("../service/user.service");
const User = require("../model/user.model");

const userRouter = Router();

userRouter.get('/me', async (req, res) => {
    const { userId } = res.locals.context;
    const user = await UserService.getUserById(userId);
    return res.status(200).json(user);
})

// Obtener un usuario por su userId
userRouter.get('/:userId', async (req, res) => {
    const otherId = req.params.userId;
    const user = await UserService.getUserById(otherId);
    return res.status(200).json(user);
})

// Obtener todos los usuarios
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    /* const users = await UserService.getAllUsers(); */
    return res.status(200).json(users);
});

// Crear un usuario - SignUp
userRouter.post('/', async (req, res) => {
    const { data } = req.body;
    /* const user = await UserService.createUser(data) */
    const user = await User.create(data);
    console.log('controller', data)
    return res.status(200).json(user);
});

// Modificar datos del usuario que esta actualmente logueado
userRouter.put('/me', async (req, res) => {
    const { userId } = res.locals.context;
    const { data } = req.body;
    const user = await UserService.updateUser(userId, data);
    return res.status(200).json(user);
});

// Eliminar el usuario que esta actualmente logueado
userRouter.delete('/me', async (req, res) => {
    const { userId } = res.locals.context;
    await UserService.deleteUser(userId);
    return res.status(200).json('User correctly deleted');
});

module.exports = {
    userRouter
};