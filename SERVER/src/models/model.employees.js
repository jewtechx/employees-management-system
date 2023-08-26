const {Pool} = require('pg')


     const  pool = new Pool({
        user:'postgres',
        host:'0.0.0.0',
        database:'employeemanagement',
        password:'Floreat123!Post',
        port:5432,  
    });

module.exports = {
    pool,
}