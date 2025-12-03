import { createPool } from "mysql2/promise"


    const connection = await createPool({
        host: "54.234.143.213",
        database: "Sakthi_auto",
        user: "root",
        password: "root@1234",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 10,
        connectTimeout: 28800
    })

    try {
        const con = await connection.getConnection();
        console.log("MySQL Database connected successfully")
        con.release();
    } catch (error) {
        console.log(error)
    }



// const [dev,err] = await connection.query("show tables;")
 
// console.log(dev)


export default connection