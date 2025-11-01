import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Fetch_Teams = AsyncHandler(async (req, res) => {
    const [result] = await connection.query("select * from Team_List where SPOC_ID = 2")
    console.log(result)
    res.send(result)
})

export default Fetch_Teams