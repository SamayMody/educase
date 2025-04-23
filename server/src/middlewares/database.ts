import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// export const connection = () => {
//     const pool = mysql.createPool({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//         database: process.env.MYSQL_DATABASE,
//         port: 55825,
//     }).promise()
//     return pool;

// };

export const connection = () => {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT),
    }).promise()
    return pool;

};


