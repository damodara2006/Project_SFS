import { createConnection } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const connection = await createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
})

    try {
        await connection.connect()
    } catch (error) {
        console.log(error)
    }



// const [dev,err] = await connection.query("show tables;")
 
// console.log(dev)


export default connection