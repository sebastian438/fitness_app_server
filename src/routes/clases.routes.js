const { Router } = require('express');
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validateInputs.js');
const { validateRole } = require('../middlewares/validateRole.js');
const { validateJWT } = require('../middlewares/validateJwt.js');

const router = new Router();

const {
    getAllClass,
    getClassByTitle,
    createClase,
    updateClaseById,
    deleteClaseById
} = require("../controllers/clases.controller.js");

const capacidad_max = 50, capacidad_min = 10;

// http://localhost:3000/api/v1/clases/allclases
// GET /allclases  lista todas las clases (JWT + rol Admin)
router.get("/allclases", [
    validateJWT,
    validateRole(2)
], getAllClass);

// http://localhost:3000/api/v1/clases/search/:title
// GET /search/:title  busca clases por título (público)
router.get("/search/:title", getClassByTitle);

// POST /createclass crea una clase (Admin)
router.post("/createclass", [
    validateJWT,
    validateRole(2),
    // Validaciones de campos con express-validator
    check("title", "Invalid title")
        .notEmpty().withMessage("El título no puede estar vacío")
        .isLength({ min: 3, max: 20 }).withMessage("El título debe tener más de dos caracteres"),
    check("descripcion", "Invalid description")
        .notEmpty().withMessage("La descripción no puede estar vacía")
        .isLength({ min: 10, max: 100 }).withMessage("La descripción debe tener entre diez y cien caracteres"),
    check("capacity", "Invalid capacity")
        .notEmpty().withMessage("La capacidad no puede estar vacía")
        .isInt({ min: capacidad_min, max: capacidad_max })
        .withMessage(`La capacidad debe estar entre ${capacidad_min} y ${capacidad_max}`),
    validateInput
], createClase);

// PUT /updateclass/:id  actualiza clase por id (Admin)
router.put("/updateclass/:id", [
    validateJWT,
    validateRole(2),
    check("title", "Invalid title")
        .notEmpty().withMessage("El título no puede estar vacío")
        .isLength({ min: 3, max: 20 }).withMessage("El título debe tener más de dos caracteres"),
    check("descripcion", "Invalid description")
        .notEmpty().withMessage("La descripción no puede estar vacía")
        .isLength({ min: 10, max: 100 }).withMessage("La descripción debe tener entre diez y cien caracteres"),
    check("capacity", "Invalid capacity")
        .notEmpty().withMessage("La capacidad no puede estar vacía")
        .isInt({ min: capacidad_min, max: capacidad_max })
        .withMessage(`La capacidad debe estar entre ${capacidad_min} y ${capacidad_max}`),
    validateInput
], updateClaseById);

// DELETE /deleteclas/:id  elimina clase por id (Admin)
router.delete("/deleteclas/:id", [
    // validateJWT,
    // validateRole(2),
], deleteClaseById);

module.exports = router;