import connection from "../database/mysql.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const Get_problems = AsyncHandler(async (req, res) => {
    const [problems] = await connection.query("SELECT * FROM problems");
    res.status(200).json({
        problems
    })
})

const Get_problem_by_id = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    // validate id to be an integer to avoid SQL injection and invalid queries
    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parsedId)) {
        return res.status(400).json({ message: 'Invalid problem id' });
    }

    // use parameterized query to prevent SQL injection
    const [problems] = await connection.query("SELECT * FROM problems WHERE ID = ?", [parsedId]);
    res.status(200).json({ problems });
})

const Post_problem = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const { title, description, sub_date, dept, reference } = req.body;

    const query = `INSERT INTO problems (TITLE, DESCRIPTION, SUB_DEADLINE,  DEPT,  Reference)
                   VALUES (?, ?, ?, ?, ?)`;

    const params = [title, description, sub_date, dept, reference];

    console.log(title, description, sub_date, dept, reference);

    // execute with your DB client, e.g.:
    const [result] = await connection.execute(query, params);

    // return the inserted id:
    console.log(result);

    res.status(201).json({ result });
})


const Delete_problem = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    // validate id
    if (!id) {
        return res.status(400).json({ message: 'Problem ID is required' });
    }

    const query = "DELETE FROM problems WHERE ID = ?";
    const [result] = await connection.execute(query, [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json({ message: 'Problem deleted successfully' });
})

export { Get_problems, Get_problem_by_id, Post_problem, Delete_problem }