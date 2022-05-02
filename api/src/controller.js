const { getConnection } = require("./config/dbConnection")

const list = async (req, res) => {
    try {
        const connection = await getConnection()
    
        const { rows } = await connection.query('SELECT * FROM tasks')

        return res.status(200).json({ data: rows })
    } catch (error) {
        return res.status(400).json({ error: JSON.stringify(error) })
    }

}

const add = async (req, res) => {
    try {
        const connection = await getConnection()
    
        const sql = `INSERT INTO tasks(description,status) VALUES ($1,1)`
    
        const { rowCount } = await connection.query(sql, [req.body.description])
    
        return res.status(200).json({ data: rowCount })
    } catch (error) {
        return res.status(400).json({ error: JSON.stringify(error) })
    }
}

const update = async (req, res) => {
    try {
        const connection = await getConnection()
    
        const { description, status } = req.body
        const { id } = req.params
    
        const sql = 'UPDATE tasks SET description=$1, status=$2 WHERE id=$3'
    
        const { rowCount } = await connection.query(sql, [description, status, id])

        return res.status(200).json({ data: rowCount })
    } catch (error) {
        return res.status(400).json({ error: JSON.stringify(error) })
    }
}

const remove = async (req, res) => {
    try {
        const connection = await getConnection()

        const { id } = req.params
    
        const sql = 'DELETE FROM tasks where id=$1'
    
        const { rowCount } = await connection.query(sql, [id])

        return res.status(200).json({ data: rowCount })
    } catch (error) {
        return res.status(400).json({ error: JSON.stringify(error) })
    }
}

module.exports = {
    list,
    add,
    update,
    remove
}