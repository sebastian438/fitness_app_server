const { queryDB } = require("../utils/db.query.js");
const {
    findByTitleOne,
    getAllClases,
    insertClass,
    updateById,
    deleteById
} = require("../queries/clases.queries.js");

// FUNCIÓN: Conseguir todas las clases
const getAll = async () => {
    const result = await queryDB(getAllClases);
    return result.rows;
};

const findByTitle = async (title) => {
    const result = await queryDB(findByTitleOne, [title]);
    return result.rows[0];
};

const insertNewClass = async (classData) => {
    const result = await queryDB(insertClass, [
        classData.title,
        classData.descripcion,
        classData.capacity,
    ]); //Ejecuta la consulta SQL para insertar una nueva clase usando los datos proporcionados
    return result.rows[0]; //Devuelve la primera fila del resultado (la clase recién insertada)
};

// FUNCION: Actualizar clase por id
const updateClassById = async ({
    class_id, 
    title,
    descripcion, 
    capacity
}) => {
    const result = await queryDB(updateById, [
        title, 
        descripcion,
        capacity, 
        class_id// al final porque es WHERE class_id = $4
    ]);
    return result.rows[0] || null;
};

// FUNCIÓN: Borrar por id
const deleteClassById = async (class_id) => {
    const result = await queryDB(deleteById, [class_id]);
    return result.rows[0];
};

module.exports = {
    getAll,
    findByTitle,
    insertNewClass,
    updateClassById,
    deleteClassById
}