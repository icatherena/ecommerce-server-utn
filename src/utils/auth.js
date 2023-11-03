const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretKey = process.env.TOKEN_SECRET;

function authenticated(req, res, next) {
    // Obtiene el token desde el header
    const [bearer, token] = (req.headers.authorization || '').split(' ');

    // Formato del header
    if (!bearer || !token || bearer !== 'Bearer') {
        return res.status(401).json({ message: 'MISSING TOKEN' });
    }

    // Valida token
    jwt.verify(token, secretKey, (err, context) => {
        if (err) {
            return res.status(401).json({ message: 'INVALID TOKEN' });
        }

        console.log("CONTEXT", context);
        res.locals.context = context;
        next();
    });
}

module.exports = authenticated;