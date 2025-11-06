import { createConnection } from "mysql2/promise"


    const connection = await createConnection({
        host: "3.92.51.181",
        database: "Sakthi_auto",
        user: "root",
        password: "root@1234",
        waitForConnections:true
    })

    try {
        await connection.connect()
        console.log("MySQL Database connected successfully")
    } catch (error) {
        console.log(error)
    }



// const [dev,err] = await connection.query("show tables;")
 
// console.log(dev)


export default connection