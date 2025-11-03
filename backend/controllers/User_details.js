import { error } from "console";
import AsyncHandler from "../utils/AsyncHandler.js";
import connection from "../database/mysql.js";
import nodemailer from "nodemailer"
import {compare, hashSync, } from "bcrypt"
const signup = AsyncHandler(async (req, res) => {
    const { email, password, role, college , college_code} = req.params;
    // console.log(req.params);
    [email, password, role, college, college_code].some((data) => {
        console.log(data.trim())
        if (data.trim() == "") {
            return res.send("All fileds required")
        }
    })
    let bcryptpass = hashSync(password, 10);
    console.log(await compare('111', bcryptpass))
    console.log(bcryptpass)
    
    
    
    const [result] = await connection.query(`INSERT INTO Users(EMAIL,PASSWORD, ROLE, COLLEGE, COLLEGE_CODE)VALUES('${email}','${bcryptpass}','${role}','${college}', '${college_code}');`);
    res.send(result)
})



export {signup}