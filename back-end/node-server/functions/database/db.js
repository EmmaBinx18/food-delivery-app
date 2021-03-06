const sql = require("mssql");
const config = require("./db-config");
const logger = require('../logger/winstin.logger');

module.exports = {
    executeStoredProcedure(storedProcedure, parameters, callback) {
        sql.connect(config, (error) => {
            if (error) {
                sql.close();
                logger.error("DATABASE ERROR", error);
                throw new Error(error);
            }

            const request = new sql.Request();
            request.input("JSON", sql.VarChar(sql.MAX), JSON.stringify(parameters));
            request.output("Error", sql.Int);
            request.execute(storedProcedure, (err, recordSets, returnValue) => {
                if (err) {
                    sql.close();
                    logger.error("DATABASE ERROR", err);
                    throw new Error(err);
                }
                else {
                    sql.close();
                    return callback(this.returnChecker(recordSets.recordset));
                }
            });
        });
    },
    returnChecker(data) {
        const response = this.mapReturnData(data);
        const json = JSON.parse(response);
        if (!response || response.length === 0 || json[0].results === 0) {
            return null;
        }
        return JSON.parse(response);
    },
    mapReturnData(data) {
        return data[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'];
    }
}