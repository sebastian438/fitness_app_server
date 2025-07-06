const {
    getAll,
    findByTitle,
    insertNewClass,
    updateClassById,
    deleteClassById
} = require('../models/clases.models.js')


const getAllClass = async (req, res) => {
    try {
        const clases = await getAll(); //Llamada al modelo para obtener todas las clases

        res.status(200).json({ //200 OK: solicitud exitosa, respuesta satisfactoria
            ok: true,
            token: req.renewedToken,
            data: clases,
        });
    } catch (error) {
        console.error("Error en getAllClass:", error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR 
            ok: false,
            token: req.renewedToken,
            error: "Error al obtener las clases",
        });
    }
};


const getClassByTitle = async (req, res) => {
    try {
        const { title } = req.params; //Obtiene el título de la URL
        const clase = await findByTitle(title); //Busca todas las películas que coincidan parcialmentecon el título

        if (!clase || clase.length === 0) { //Si no hay clases
            return res.status(404).json({ //404 NOT FOUND: el servidor no pudo encontrar el recurso solicitado por el cliente(navegador)
                ok: false,
                token: req.renewedToken,
                error: 'No se encontraron clases con ese título.',
            });
        }
        res.status(200).json({ //200 OK: solicitud y respuesta exitosas
            ok: true,
            token: req.renewedToken,
            data: clase,
        });


    } catch (error) {
        console.error('Error en getClassByTitle:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            token: req.renewedToken,
            error: 'Error interno al buscar la clase.'
        });
    }
};


const createClase = async (req, res) => {
    const { //Desestructura los datos recibidos del cuerpo-body de la solicitud
        title,
        descripcion,
        capacity
    } = req.body;

    try {
        // Verificar si la clase ya existe
        const existingClase = await findByTitle(title);
        if (existingClase) {
            return res.status(409).json({
                ok: false,
                token: req.renewedToken,
                msg: 'La clase ya existe', //404 CONFLICT
            });
        }

        // Insertar la clase. Crea el objeto con todos los datos. 
        const newClass = await insertNewClass({
            title,
            descripcion,
            capacity
        });

        //Devuelve una respuesta exitosa con los datos de la clase recién creada
        return res.status(201).json({ //201 CREATED 
            ok: true,
            token: req.renewedToken,
            msg: 'Clase creada con éxito',
            clase: newClass,
        });

    } catch (error) {
        console.error('Error en createClase:', error);
        return res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};


const updateClaseById = async (req, res) => {
    try {
        const { //Extrae del body los datos que pueden actualizarse
            title, descripcion,
            capacity, class_id
        } = req.body;

        const updatedClass = await updateClassById({// Llama a la función que actualiza la clase en la BBDD pasando todos los datos
            class_id: Number(class_id), // Convierte a número para evitar errores de tipo
            title,
            descripcion,
            capacity
        });

        if (!updatedClass) { // Si no se ha actualiza ninguna clase:
            return res.status(404).json({
                ok: false,
                token: req.renewedToken,
                error: "Clase no encontrada o no actualizada",
            });
        }

        res.status(200).json({
            ok: true,
            data: updateClass
        });

    } catch (error) {
        console.error("Error en updateClassById:", error);
        res.status(500).json({
            ok: false,
            error: "Error interno al actualizar la clase.",
        });
    }
};


const deleteClaseById = async (req, res) => {
    const { class_id } = req.params; //Extrae el parámetro de la URL (req.params)

    try {
        // Llama a la función del modelo que elimina la clase por su ID
        const deleted = await deleteClassById(Number(class_id)); //Convierte a número para evitar errores de tipo

        if (!deleted) { //Si no se elimina ninguna clase
            return res.status(404).json({
                ok: false,
                token: req.renewedToken,
                msg: 'Clase no encontrada',
            });
        }

        return res.status(200).json({
            ok: true,
            token: req.renewedToken,
            msg: 'Clase eliminada correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar la clase:', error);
        return res.status(500).json({
            ok: false,
            token: req.renewedToken,
            msg: 'Error interno al eliminar la clase',
        });
    }
};

module.exports = {
    getAllClass,
    getClassByTitle,
    createClase,
    updateClaseById,
    deleteClaseById
};