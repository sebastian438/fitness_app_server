const clasesQueries = {

    //Consulta para obtener clase por su título
    findByTitleOne:
        `SELECT * 
        FROM clases 
        WHERE title ILIKE $1`,

    //Consulta para obtener todas las clases. 
    getAllClases:
        `SELECT * 
        FROM clases`,

    //Consulta para insertar una clase en la bbdd. Devuelve la clase insertada. 
    insertClass:
        `INSERT INTO clases 
        (title, descripcion, capacity)
        VALUES 
        ($1, $2, $3)
        RETURNING *`,

    //Consulta para editar una clase
    updateById: `
        UPDATE films
        SET 
            title = $1,
            descripcion = $2,
            capacity = $3,
        WHERE class_id = $4
        RETURNING *;`,

    deleteById: `
        DELETE FROM clases 
        WHERE class_id = $1 
        RETURNING *;`,
};




// EXPORTS
module.exports = clasesQueries;