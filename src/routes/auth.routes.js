const { Router } = require('express');
const { login, signup, logout } = require('../controllers/auth.controller');


const router = Router();

// POST /api/v1/auth  login de usuario
router.post("/", login);

// POST /api/v1/auth/signup  registro de nuevo usuario
router.post("/signup", signup);

router.post('/logout', logout);



module.exports = router;