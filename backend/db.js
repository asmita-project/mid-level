const mysql = require('mysql')

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo_test'
})


module.exports = db;