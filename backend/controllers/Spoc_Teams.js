import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Fetch_Teams = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const [result] = await connection.query("select * from Team_List where SPOC_ID = ?", [id])
    
    res.send(result)
})

const Fetch_Team_Members = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const [result] = await connection.query(`select * from Team_Members_List where Team_ID = ${id}`)
    // console.log(result)
    res.send(result)
})

export { Fetch_Teams, Fetch_Team_Members }