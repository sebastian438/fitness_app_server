const validateRole = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)) {
            next();
        } else {
            return res.status(404).json({
                ok: false,
                msg: "incorrect roles"
            });
        }
    }

}

module.exports = {
    validateRole
};