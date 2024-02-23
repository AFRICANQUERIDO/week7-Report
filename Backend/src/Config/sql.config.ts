export const sqlConfig = {
    // user:'sa',
    // password:'sql.jane',
    // database:'JCC',
    // server:'DESKTOP-G3PNO3V',
    user: process.env.db_user as string || "sa",
    password: process.env.db_password as string || "sql.jane",
    database: process.env.db_database as string || "JCC",
    server: process.env.db_server as string || "DESKTOP-G3PNO3V",

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000,
    }, options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}

console.log(sqlConfig);