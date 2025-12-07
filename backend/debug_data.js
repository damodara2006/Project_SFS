import connection from "./database/mysql.js";

const debugDB = async () => {
    try {
        console.log("--- Checking Submissions ---");
        const [submissions] = await connection.query("SELECT * FROM submissions");
        console.log(`Found ${submissions.length} submissions.`);
        if (submissions.length > 0) {
            console.log("Sample Submission:", submissions[0]);
        }

        console.log("\n--- Checking Teams ---");
        const [teams] = await connection.query("SELECT * FROM Team_List");
        console.log(`Found ${teams.length} teams.`);
        if (teams.length > 0) {
            console.log("Sample Team:", teams[0]);
        }

        console.log("\n--- Checking Users (SPOCs) ---");
        const [users] = await connection.query("SELECT * FROM Users WHERE ROLE = 'SPOC' OR ROLE = 'spoc'");
        console.log(`Found ${users.length} SPOCs.`);

        console.log("\n--- Testing Join Query ---");
        const query = `
            SELECT s.*, t.SPOC_ID, u.COLLEGE as collegeName 
            FROM submissions s
            LEFT JOIN Team_List t ON s.TEAM_ID = t.ID
            LEFT JOIN Users u ON t.SPOC_ID = u.ID
        `;
        const [joined] = await connection.query(query);
        console.log(`Join Query returned ${joined.length} rows.`);
        if (joined.length > 0) {
            console.log("Sample Joined Row:", joined[0]);
        }

    } catch (err) {
        console.error("Error during debug:", err);
    } finally {
        process.exit();
    }
};

debugDB();
