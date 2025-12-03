import AsyncHandler from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";
import nodemailer from "nodemailer"
import { compare, hashSync } from "bcrypt"
import cookie from "cookie-parser"
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
        await res.cookie("login_creditionals", data, {
            maxAge: 60 * 1000 * 60,
            secure: true,
            httpOnly:true,
            sameSite: "none",
        })
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
        await res.clearCookie("login_creditionals", {
            maxAge: 864000,
            secure: true
        })
        console.log("dele");
        console.log("Cookie cleared");
        res.status(200).json({ message: "Logout successful" });
        
    } catch (error) {
        console.log(error)
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