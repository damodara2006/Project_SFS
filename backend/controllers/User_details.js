import AsyncHandler from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";
import nodemailer from "nodemailer"
import { compare, hashSync } from "bcrypt"
// cookie-parser is already applied globally in app, no need to import here
import jwt from "jsonwebtoken"

const signup = AsyncHandler(async (req, res) => {
    const { email, password, role, college, college_code, name, date } = req.params;

    console.log(req.params);
    
    // console.log(req.params);
    [email, password, role, college_code, name].some((data) => {
        console.log(data.trim())
        if (data.trim() == "") {
            return res.send("All fileds required")
        }
    })
    let bcryptpass = hashSync(password, 10);
    // console.log(await compare('111', bcryptpass))
    // console.log(bcryptpass)

    console.log(date);
    
    try {
        if (role == "spoc") {
            let [result, cod] = await connection.query(`INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE,NAME,DATE)VALUES('${email}','${bcryptpass}','${role.toUpperCase()}','${college}', '${college_code}','${name}','${date}');`);
            res.status(200).send(result)
            
        }
        else {
            let [result, cod] = await connection.query(`INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE,NAME,DATE, STATUS)VALUES('${email}','${bcryptpass}','${role.toUpperCase()}','${college}', '${college_code}','${name}','${date}','ACTIVE');`);
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)
        console.log("error")
        res.status(201).send("error")
    }

})

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(password)
    const [result] = await connection.query("SELECT * FROM Users WHERE EMAIL = (?)", [email])
    if (!result || result.length === 0) {
        // no user found
        return res.status(401).json({ data: "REJECTED", message: "Invalid credentials" });
    }

    const user = result[0];
    console.log(user)

    let response;
    try {
        response = await compare(password, user.PASSWORD);
    } catch (err) {
        // bcrypt compare failed
        return res.status(500).json({ data: "REJECTED", message: "Internal error" });
    }

    let rs = user.STATUS
    if (rs === "ACTIVE" && response) {
        
        console.log(process.env.JWT_SCERET)
    
        const data = jwt.sign(result[0], process.env.JWT_SCERET)
        // console.log(await jwt.verify(data, process.env.JWT_SCERET))
        // console.log(data)
        // For cross-site cookies browsers now require SameSite=None and Secure=true.
        // Set secure in production so local development over http still works.
        const cookieOptions = {
            maxAge: 60 * 1000 * 60,
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === 'production'
        }
        res.cookie("login_creditionals", data, cookieOptions)
        console.log("done");
        
    
        res.json({ data: response, user: result })
    }
    else if (rs == 'PENDING') {
        res.json({ data: "PENDING", user: result })
    }
    else {
        res.status(401).json({ data: "REJECTED", user: result })
    }

}

const logout = async(req, res) => {
    console.log("hh")
    try {
        // When clearing, use the same attributes as when setting so the browser removes it
        const clearOpts = {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === 'production'
        }
        res.clearCookie("login_creditionals", clearOpts)
        console.log("Cookie cleared");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Logout failed' })
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