const sql = require('mssql');

const config = {
    server: '',
    database: '',
    user: '',
    password: '',
    port: 1433
};

module.exports.database = {
    getConnection(){
        return sql.createConnection(config);
    }
}