import { Router } from "express";
import { Add_Team_Members } from "../controllers/Team_members.js";
import { Fetch_Teams, Fetch_Team_Members } from "../controllers/Spoc_Teams.js";
const router = Router();

router.route("/").get((req, res) => {
    res.send("Hello backend")
})
router.route("/add_members").post(Add_Team_Members)
router.route("/fetch_teams").get(Fetch_Teams)
router.route("/fetch_team_members/:id").post(Fetch_Team_Members)

export default router