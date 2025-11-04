import { AsyncHandler } from "../utils/AsyncHandler.js";
import { connection } from "../database/mysql.js";

const SubmitSolution = AsyncHandler(async (req , res)=>{
    const { problemId,teamId,SOL_LINK} = req.body;
    const SUB_DATE = new Date();
    
    const status = "Submitted";
    const query = `INSERT INTO submissions (PROBLEM_ID, TEAM_ID, SUB_DATE, STATUS, SOL_LINK) VALUES (?,?,?,?,?)`;
    const values = [problemId, teamId, SUB_DATE, status, SOL_LINK];

    const [result] = await connection.query(query, values);

    res.status(201).json({ message: "Solution submitted successfully", submissionId: result.insertId });
})


export { SubmitSolution };