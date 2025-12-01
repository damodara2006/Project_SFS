import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Spoc_approve = AsyncHandler(async (req, res) => {
    const [data,error] = await connection.query("SELECT * FROM Users WHERE STATUS='PENDING' AND ROLE='SPOC'");
    console.log(data);
    console.log("error",error);

    res.status(200).json(data)
})

const handleSpocApprove = AsyncHandler(async (req, res) => {
    const { id, approve } = req.body;
    if (approve) {
        var [data, err] = await connection.query(`UPDATE Users SET STATUS='ACTIVE' WHERE ID=?`,[id])
    } else {
        var [data, err] = await connection.query(`UPDATE Users SET STATUS='REJECTED' WHERE ID=?`, [id])
    }
    console.log(data)
    res.send(data)
})

export {Spoc_approve, handleSpocApprove}