import mysql from 'mysql2/promise';

const run = async () => {
    try {
        const connection = await mysql.createConnection({
            host: '18.212.248.213', // from .env
            user: 'root',
            password: 'root@1234',
            database: 'Sakthi_auto',
            port: 3306
        });

        console.log("Connected to DB");
        const [rows] = await connection.execute('SELECT * FROM submissions');
        console.log(`Found ${rows.length} submissions.`);

        const [teams] = await connection.execute('SELECT * FROM Team_List');
        console.log(`Found ${teams.length} teams.`);
        if (teams.length > 0) console.log("First Team:", teams[0]);

        const [problems] = await connection.execute('SELECT * FROM problems');
        console.log(`Found ${problems.length} problems.`);
        if (teams.length > 0 && problems.length > 0) {
            const teamId = teams[0].ID;
            const problemId = problems[0].ID;
            console.log(`Inserting submission for Team ${teamId} and Problem ${problemId}...`);

            const [result] = await connection.execute(
                `INSERT INTO submissions (PROBLEM_ID, TEAM_ID, SOL_TITLE, SOL_DESCRIPTION, SUB_DATE, STATUS, SOL_LINK) 
                 VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
                [problemId, teamId, 'Verification Submission', 'This is a test submission created by Antigravity.', 'PENDING', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf']
            );
            console.log(`Inserted Submission ID: ${result.insertId}`);
        } else {
            console.log("Cannot insert submission: missing team or problem.");
        }

        await connection.end();
    } catch (err) {
        console.error("DB Error:", err);
    }
};

run();
