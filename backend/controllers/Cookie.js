import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const Get_cookies = AsyncHandler(async (req, res) => {
    const cok = req.cookies;
    // If cookie missing, return 401 instead of throwing
    if (!cok || !cok.login_creditionals) {
        return res.status(401).json({ message: 'No auth cookie' })
    }
    try {
        const data = await jwt.verify(cok.login_creditionals, process.env.JWT_SCERET)
        res.send(data)
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
})
export { Get_cookies }