import AsyncHandler from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";
import nodemailer from "nodemailer"
import { compare, hashSync } from "bcrypt"
import cookie from "cookie-parser"
import jwt from "jsonwebtoken"

const signup = AsyncHandler(async (req, res) => {
    const { email, password, role, college, college_code, name, date } = req.params;
    console.log("Error Message");
    
    // basic presence check
    if ([email, password, role, college_code, name].some((data) => !data || String(data).trim() === "")) {
        return res.status(400).send("All fields required");
    }
    let bcryptpass = hashSync(password, 10);
    // console.log(await compare('111', bcryptpass))
    // console.log(bcryptpass)

    // avoid logging potentially sensitive values like dates or params
    
    try {
        if (role == "spoc") {
            const query = `INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE, NAME, DATE) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const params = [email, bcryptpass, role.toUpperCase(), college, college_code, name, date];
            const [result] = await connection.query(query, params);
            res.status(200).json(result);
            
        }
        else {
            const query = `INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE, NAME, DATE, STATUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const params = [email, bcryptpass, role.toUpperCase(), college, college_code, name, date, 'ACTIVE'];
            const [result] = await connection.query(query, params);
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        console.log("error")
        res.status(201).send("error")
    }

})

// Simple in-memory login attempt tracker to mitigate brute-force
const loginAttempts = new Map(); // key -> { count, firstAttemptTs }
const MAX_ATTEMPTS = 20;
const BLOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

const login = async (req, res) => {
    const { email, password } = req.body;
    const clientKey = req.ip || email || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const attempt = loginAttempts.get(clientKey);
    if (attempt && attempt.count >= MAX_ATTEMPTS && (Date.now() - attempt.firstAttemptTs) < BLOCK_TIME_MS) {
        return res.status(429).json({ data: 'LOCKED', message: 'Too many failed login attempts. Try again later.' });
    }

    const [result] = await connection.query("SELECT * FROM Users WHERE EMAIL = (?)", [email])
    if (!result || result.length === 0) {
        // no user found
        return res.status(401).json({ data: "REJECTED", message: "Invalid credentials" });
    }

    const user = result[0];

    let response;
    try {
        response = await compare(password, user.PASSWORD);
    } catch (err) {
        return res.status(500).json({ data: "REJECTED", message: "Internal error" });
    }

    let rs = user.STATUS
    if (rs === "ACTIVE" && response) {
        // successful login: clear any recorded attempts
        loginAttempts.delete(clientKey);

        const token = jwt.sign(result[0], process.env.JWT_SCERET);
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie("login_creditionals", token, {
            maxAge: 86400000,
            secure: isProd,
            httpOnly: true,
            sameSite: 'lax'
        });
        return res.json({ data: response, user: result });
    }
    else if (rs == 'PENDING') {
        res.json({ data: "PENDING", user: result })
    }
    else {
        // failed auth: increment attempts
        if (!attempt) {
            loginAttempts.set(clientKey, { count: 1, firstAttemptTs: Date.now() });
        } else {
            attempt.count = (attempt.count || 0) + 1;
            loginAttempts.set(clientKey, attempt);
        }
        res.status(401).json({ data: "REJECTED", user: result })
    }

}

const logout = async(req, res) => {
    try {
        const isProd = process.env.NODE_ENV === 'production';
        res.clearCookie("login_creditionals", {
            maxAge: 864000,
            secure: isProd,
            httpOnly: true,
            sameSite: 'lax'
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Logout failed' });
    }
}

const GetAllUsers = AsyncHandler(async (req, res) => {
    const [users] = await connection.query("SELECT * FROM Users");
    res.status(200).json(users);
});

const GetAllEvaluators = AsyncHandler(async (req, res) => {
    const [users, error] = await connection.query("SELECT * FROM Users WHERE ROLE='EVALUATOR'")
    res.send(users)
})

export { signup, login, logout, GetAllUsers, GetAllEvaluators }