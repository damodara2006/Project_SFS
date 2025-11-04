import AsyncHandler from "../utils/AsyncHandler.js";

const Get_cookies = AsyncHandler(async (req, res) => {
    const cok = req.cookies;
    console.log(cok)
    res.send(req.cookies)
})
export {Get_cookies}