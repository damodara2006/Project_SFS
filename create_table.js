import connection from "./backend/database/mysql.js";

const createTable = async () => {
    try {
        const query = `
      CREATE TABLE IF NOT EXISTS problem_evaluators (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        PROBLEM_ID INT,
        EVALUATOR_ID INT,
        FOREIGN KEY (PROBLEM_ID) REFERENCES problems(ID) ON DELETE CASCADE,
        FOREIGN KEY (EVALUATOR_ID) REFERENCES Users(ID) ON DELETE CASCADE
      );
    `;
        await connection.query(query);
        console.log("Table problem_evaluators created successfully.");
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        process.exit();
    }
};

createTable();
