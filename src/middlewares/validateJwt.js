const { generatedJwt } = require("../utils/generate.jwt");
const jwt = require('jsonwebtoken');


const verifyJWT = async (token) => {
    try {
        const privateKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, privateKey);
        return decoded;
    } catch (error) {
        throw error;
    }
};

const validateJWT = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No se ha proporcionado token de autorización"
        });
    }
    try {
        const playLoad = await verifyJWT(token);
        const renewedToken = await generatedJwt({
            uid: playLoad.uid,
            email: playLoad.email,
            role: playLoad.role
        });
        req.tokenEmail = playLoad.email;
        req.role = playLoad.role;
        req.renewedToken = renewedToken;
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

module.exports = {
    validateJWT
};