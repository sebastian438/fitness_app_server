const { Router } = require('express');
const { check } = require('express-validator');

const router = new Router();

const {
    getAllClass,
    getClassByTitle,
    createClase,
    updateClaseById,
    deleteClaseById
} = require("../controllers/clases.controller.js");


router.get("/allclases", getAllClass);

router.get("/class/search/:title", getClassByTitle);

router.post("/createclass", createClase);

router.put("/updateclass", updateClaseById);

router.delete("/deleteclas/:class_id", deleteClaseById);

module.exports = router;