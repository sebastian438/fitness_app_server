const pool = require("./db.connect.js")
//queryDB envuelve pool.query.
const queryDB = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    queryDB
}