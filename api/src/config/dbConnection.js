const { Pool } = require('pg')
const {
    user,
    password,
    host,
    port,
    database
} = require('./env.json')['database']

const getConnection = () => {
    const pool = new Pool({
        connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`
    })

    return pool.connect()
}

module.exports = {
    getConnection
}