import { AsyncHandler } from "../utils/AsyncHandler.js";
import { connection } from "../database/mysql.js";

const SubmitSolution = AsyncHandler(async (req, res) => {
    const { problemId, teamId, SOL_LINK, SOL_TITLE = null, SOL_DESCRIPTION = null } = req.body;
    if (!problemId || !teamId || !SOL_LINK) {
        return res.status(400).json({ message: "problemId, teamId and SOL_LINK are required" });
    }

    const SUB_DATE = new Date().toISOString().slice(0, 10);
    const status = "PENDING"; 
    const query = `INSERT INTO submissions (PROBLEM_ID, TEAM_ID, SOL_TITLE, SOL_DESCRIPTION, SUB_DATE, STATUS, SOL_LINK) VALUES (?,?,?,?,?,?,?)`;
    const values = [problemId, teamId, SOL_TITLE, SOL_DESCRIPTION, SUB_DATE, status, SOL_LINK];

    const [result] = await connection.query(query, values);

    res.status(201).json({ message: "Solution submitted successfully", submissionId: result.insertId });
});


export { SubmitSolution };