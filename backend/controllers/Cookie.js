import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const Get_cookies = AsyncHandler(async (req, res) => {
    const cok = req.cookies || {};
    const token = cok.login_creditionals;
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SCERET);
        return res.json(data);
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
});

export { Get_cookies };