import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Fetch_Teams = AsyncHandler(async (req, res) => {
    // console.log(req.params);
    
    const { id } = req.params;
    const [result] = await connection.query("select * from Team_List WHERE SPOC_ID = ?", [id])
    
    res.send(result)
})

const Fetch_Team_Members = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    // console.log(id)
    const [result] = await connection.query(`select * from Team_Members_List where Team_ID = ${id}`)
    // console.log(result)
    res.send(result)
})

const Delete_team = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const [result] = await connection.query("DELETE FROM Team_List WHERE ID = ?", [id])
    res.send(result)
})

export { Fetch_Teams, Fetch_Team_Members, Delete_team }