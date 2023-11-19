require("dotenv").config();

let db = require("knex")({
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 3 },
});

module.exports = db;