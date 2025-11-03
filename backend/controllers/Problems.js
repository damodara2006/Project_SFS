import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Get_problems = AsyncHandler(async (req, res) => {
    const [problems] =  await connection.query("SELECT * FROM problems");
    res.status(200).json({
        problems
    })
})

const Get_problem_by_id = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const [problems] =  await connection.query(`SELECT * FROM problems WHERE ID = ${id}`);
    res.status(200).json({
        problems
    })
})

const Post_problem = AsyncHandler(async (req, res) => {
    const { title, description, sub_date, category, dept, links, reference } = req.body;

    const query = `INSERT INTO problems (TITLE, DESCRIPTION, SUB_DATE, CATEGORY, DEPT, Links, Reference)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const params = [title, description, sub_date, category, dept, links, reference];

    // execute with your DB client, e.g.:
    const [result] = await connection.execute(query, params);

    // return the inserted id:
     res.status(201).json({result});
})
    

export { Get_problems, Get_problem_by_id, Post_problem }