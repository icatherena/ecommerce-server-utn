import { Router } from "express";

export const userRouter = Router();

const UserService = new UserServiceImpl(
    new UserRepositoryImpl(db)
)

userRouter.get('/', async (req, res) => {
    const users = await service.getAllUsers();
    return res.status(200).json(users);
})
