import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
const Get_cookies = AsyncHandler(async (req, res) => {
    const cok = req.cookies;
    // console.log(cok)
    const data = await jwt.verify(cok.login_creditionals, process.env.JWT_SCERET)
    res.send(data)
})
export {Get_cookies}