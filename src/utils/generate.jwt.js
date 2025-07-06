const jwt = require('jsonwebtoken');

const generatedJwt = async ({ uid, email, role }) => {
    try {
        const privateKey = process.env.JWT_SECRET;
        const playload = { uid, email, role };
        const token = jwt.sign(playload, privateKey, { expiresIn: '2h' });
        return token;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    generatedJwt
};