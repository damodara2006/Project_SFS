import { Router } from "express";
import { Add_Team_Members } from "../controllers/Team_members.js";

const router = Router();

router.route("/").get((req, res) => {
    res.send("Hello backend")
})
router.route("/add_members").post(Add_Team_Members)

export default router