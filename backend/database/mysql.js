import { createPool } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()
const connection = await createPool({
    host: process.env.DB_HOST || "54.234.143.213",
    database: process.env.DB_NAME || "Sakthi_auto",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Damo@999428",
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONN_LIMIT || '10', 10),
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

try {
    const con = await connection.getConnection();
    console.log("MySQL Database connected successfully")
    con.release();
} catch (error) {
    console.error('MySQL connection error', error)
}

export default connection