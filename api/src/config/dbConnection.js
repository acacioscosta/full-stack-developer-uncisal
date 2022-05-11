const { Pool } = require('pg')
const {
    user,
    password,
    host,
    port,
    database
} = require('./env.json')['database']

let connectionString = process.env.NODE_ENV === 'development'
    ? `postgres://${user}:${password}@${host}:${port}/${database}`
    : process.env.DATABASE_URL

const getConnection = () => {
    const pool = new Pool({ connectionString })

    return pool.connect()
}

module.exports = {
    getConnection
}