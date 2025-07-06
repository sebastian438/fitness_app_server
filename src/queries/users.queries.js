const userQueries = {
    findByEmail: `SELECT * FROM users WHERE email = $1`,

    findById: `SELECT * FROM users WHERE user_id = $1`,

    //users by role(implementar si me hace falta)
    insertUser:
        `INSERT INTO users (name, email, role_id, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,

    updateById:
        `
            UPDATE users
            SET 
                name = $1,
                email = $2,
                role_id = $3,
                password_hash = $4
            WHERE user_id = $5
            RETURNING *;`,

    deleteById:
        `
            DELETE FROM users 
            WHERE user_id = $1 
            RETURNING *;`
};

module.exports = userQueries;