import { Router } from "express";
import { Add_Team_Members, Update_team } from "../controllers/Team_members.js";
import { Fetch_Teams, Fetch_Team_Members, Delete_team } from "../controllers/Spoc_Teams.js";
import { login, logout, signup } from "../controllers/User_details.js";
import { Verify_OTP } from "../controllers/Verify_OTP.js";
import { Post_problem } from "../controllers/Problems.js";
import { Get_problems } from "../controllers/Problems.js";
import { Get_problem_by_id } from "../controllers/Problems.js";
import { Get_cookies } from "../controllers/Cookie.js";
import { Get_all_submissions } from "../controllers/Submission.js";

const router = Router();


router.route("/add_members/:id").post(Add_Team_Members)
router.route("/fetch_teams/:id").post(Fetch_Teams)
router.route("/fetch_team_members").post(Fetch_Team_Members)
router.route("/register/:email/:password/:role/:college/:college_code/:name").post(signup)
router.route("/verify_email/:email").post(Verify_OTP)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/addproblems").post(Post_problem)
router.route("/get_problems").get(Get_problems)
router.route("/problems/:id").get(Get_problem_by_id)
router.route("/cookie").get(Get_cookies)
router.route("/submissions").get(Get_all_submissions)
router.route("/update_team").post(Update_team)
router.route("/delete_team").post(Delete_team)

export default router