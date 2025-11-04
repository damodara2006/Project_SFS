import { Router } from "express";
import { Add_Team_Members } from "../controllers/Team_members.js";
import { Fetch_Teams, Fetch_Team_Members } from "../controllers/Spoc_Teams.js";
import { login, logout, signup } from "../controllers/User_details.js";
import { Verify_OTP } from "../controllers/Verify_OTP.js";
import { Post_problem } from "../controllers/Problems.js";
import { Get_problems } from "../controllers/Problems.js";
import { Get_problem_by_id } from "../controllers/Problems.js";
import { Get_cookies } from "../controllers/Cookie.js";

const router = Router();


router.route("/add_members").post(Add_Team_Members)
router.route("/fetch_teams").get(Fetch_Teams)
router.route("/fetch_team_members/:id").post(Fetch_Team_Members)
router.route("/register/:email/:password/:role/:college/:college_code/:name").post(signup)
router.route("/verify_email/:email").post(Verify_OTP)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/problems").post(Post_problem)
router.route("/get_problems").get(Get_problems)
router.route("/problems/:id").get(Get_problem_by_id)
router.route("/cookie").get(Get_cookies)

export default router