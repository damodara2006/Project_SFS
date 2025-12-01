import  AsyncHandler  from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";

const SubmitSolution = AsyncHandler(async (req, res) => {
    const { problemId, teamId, SOL_LINK, SOL_TITLE = null, SOL_DESCRIPTION = null } = req.body;
    if (!problemId || !teamId || !SOL_LINK) {
        return res.status(400).json({ message: "problemId, teamId and SOL_LINK are required" });
    }

    const [teamExists] = await connection.query('SELECT ID FROM Team_List WHERE ID = ?', [teamId]);
    if (teamExists.length === 0) {
        return res.status(404).json({ message: "Team not found" });
    }

    const SUB_DATE = new Date().toISOString().slice(0, 10);
    const status = "PENDING"; 
    const query = `INSERT INTO submissions (PROBLEM_ID, TEAM_ID, SOL_TITLE, SOL_DESCRIPTION, SUB_DATE, STATUS, SOL_LINK) VALUES (?,?,?,?,?,?,?)`;
    const values = [problemId, teamId, SOL_TITLE, SOL_DESCRIPTION, SUB_DATE, status, SOL_LINK];

    const [result] = await connection.query(query, values);

    res.status(201).json({ message: "Solution submitted successfully", submissionId: result.insertId });
});


const Get_solution = AsyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const [result] = await connection.query(`SELECT * FROM submissions WHERE TEAM_ID = ?`, [teamId]);
    res.status(200).json(result);
});

const Get_all_submissions = AsyncHandler(async (req, res) => {
    const { problemId } = req.query;
    let query = `SELECT * FROM submissions`;
    const params = [];
    if (problemId) {
        query += ` WHERE PROBLEM_ID = ?`;
        params.push(problemId);
    }
    query += ` ORDER BY SUB_DATE DESC`;
    const [result] = await connection.query(query, params);
    res.status(200).json(result);
});

export { SubmitSolution, Get_solution, Get_all_submissions };