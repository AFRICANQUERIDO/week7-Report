"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
exports.sqlConfig = {
    // user:'sa',
    // password:'sql.jane',
    // database:'JCC',
    // server:'DESKTOP-G3PNO3V',
    user: process.env.db_user || "sa",
    password: process.env.db_password || "sql.jane",
    database: process.env.db_database || "JCC",
    server: process.env.db_server || "DESKTOP-G3PNO3V",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000,
    }, options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
console.log(exports.sqlConfig);
