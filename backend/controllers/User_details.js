import AsyncHandler from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";
import nodemailer from "nodemailer"
import { compare, hashSync } from "bcrypt"
import cookie from "cookie-parser"
import jwt from "jsonwebtoken"

const signup = AsyncHandler(async (req, res) => {
    const { email, password, role, college, college_code, name } = req.params;
    // console.log(req.params);
    [email, password, role, college, college_code, name].some((data) => {
        console.log(data.trim())
        if (data.trim() == "") {
            return res.send("All fileds required")
        }
    })
    let bcryptpass = hashSync(password, 10);
    // console.log(await compare('111', bcryptpass))
    // console.log(bcryptpass)
    try {
        let [result, cod] = await connection.query(`INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE,NAME)VALUES('${email}','${bcryptpass}','${role.toUpperCase()}','${college}', '${college_code}','${name}');`);
        res.status(200).send(result)

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
    console.log(result[0])

    let response = await compare(password, result[0].PASSWORD)


    console.log(process.env.JWT_SCERET)

    const data = jwt.sign(result[0], process.env.JWT_SCERET)
    // console.log(await jwt.verify(data, process.env.JWT_SCERET))
    // console.log(data)
    await res.cookie("login_creditionals", data, {
        maxAge: 86400000,
        secure: true,
        // httpOnly:
    })
    console.log("done");
    

    res.json({data:response, user:result})
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

export { signup, login, logout }