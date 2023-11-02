const { Router } = require("express");
const User = require('../../user/model/user.model');

const bcrypt = require('bcrypt');

module.exports.authRouter = Router();

const authService = new AuthService(
    new UserRepository(db)
)

// Crear usuario
authRouter.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const doesUserExist = await User.findOne({email});

        if (doesUserExist) {
            return res.status(409).json({ message: 'Conflict. A user with this email already exist'})
        } else {
            const saltRounds = 10; 
            bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
                
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });

                } else {
                    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
                    
                    try {
                        await newUser.save();
                        const token = jwt.sign({ userId: newUser._id }, secretKey, {
                            expiresIn: '1h',
                        });
                        res.status(201).json({ token });
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal server error' });
                    }
                }
            });
        }

    } catch {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})

// Iniciar sesion
authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) { // Verifica si el usuario existe
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // Compara la password del campo con la hasheada en la db

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { // Genera el token a retornar
            expiresIn: '1h',
        });

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})