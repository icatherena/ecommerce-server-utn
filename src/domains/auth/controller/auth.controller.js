const { Router } = require("express");

module.exports.authRouter = Router();

const authService = new AuthService(
    new UserRepository(db)
)

// Crear usuario
authRouter.post('/signup', async (req, res) => {
    const { name, lastname, email, password } = req.body;
    await authService.signUp(name, lastname, email, password);
    return res.status(200).send(token);
})

// Iniciar sesion
authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    await authService.signIn(email, password);
    return res.status(200).send(token);
})