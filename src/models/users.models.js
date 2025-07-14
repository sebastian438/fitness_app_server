// queryDB es un helper que gestiona la conexión y la ejecución de SQL con pg
const { queryDB } = require("../utils/db.query.js");
const {
    findByEmail,
    findById,
    insertUser,
    updateById,
    deleteById
} = require("../queries/users.queries");


//FUNCION buscar por email
/**
 * Busca un usuario en la base de datos por su email y lo devuelve.
 *
 * @async
 * @function findByEmail
 * @param {string} email - Email del usuario que se quiere buscar.
 * @returns {Promise <Object | undefined>} El usuario encontrado o `undefined` si no existe.
 */
const findUserByEmail = async (email) => {
    const result = await queryDB(findByEmail, [email]); // Ejecuta la consulta SQL con el email como parámetro
    return result.rows[0]; // Devuelve el primer usuario que coincida con el email
};

/**
 * Busca un usuario por su id
 * @param {*} id id del usuario a buscar
 * @returns usuraio
 */
const findUserById = async (id) => {
    const result = await queryDB(findById, [id]);
    return result.rows[0];
}


/**
 * Crea un nuevo usuario con los datos del formulario
 * @param {*} name nombre del nuevo usuario
 * @param {*} email email del nuevo usuario
 * @param {*} role id del rol del nuevo usuario
 * @param {*} password contraseña del nuevo usuario
 * @returns usuario nuevo
 */
const saveNewUser = async ({ name, email, role, password }) => {
    const result = await queryDB(insertUser, [name, email, role, password]);
    return result.rows[0];
}


/**
 * Actualiza datos del usuario
 * @param {*} name  nuevo nombre del usuario 
 * @param {*} email nuevo email del usuario
 * @param {*} role nuevo rol del usuario
 * @param {*} password nueva contraseña del usuario
 * @param {*} id id actual del usuario(para filtrar la búsqueda)
 * @returns 
 */
const updateUserById = async (
    name,
    email,
    role,
    password,
    id
) => {
    const result = await queryDB(updateById, [name, email, role, password, id]);
    return result.rows[0];
}


/**
 * Elimina un usuario por su id
 * @param {*} id id del usuario a eliminar
 * @returns usuario eliminado
 */
const deleteUserById = async (id) => {
    const result = await queryDB(deleteById, [id]);
    return result.rows[0];
}

module.exports = {
    findUserByEmail,
    findUserById,
    saveNewUser,
    updateUserById,
    deleteUserById
};