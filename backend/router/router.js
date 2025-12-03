import { Router } from "express";

// Controller Imports
import { Add_Team_Members, Update_team } from "../controllers/Team_members.js";
import { Fetch_Teams, Fetch_Team_Members, Delete_team } from "../controllers/Spoc_Teams.js";
import { login, logout, signup, GetAllUsers, GetAllEvaluators } from "../controllers/User_details.js";
import { Verify_OTP } from "../controllers/Verify_OTP.js";
import Verify_OTP_Check from "../controllers/Verify_OTP_Check.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { Post_problem, Get_problems, Get_problem_by_id } from "../controllers/Problems.js";
import { Get_cookies } from "../controllers/Cookie.js";
import { Get_all_submissions, SubmitSolution } from "../controllers/Submission.js";
import { handleSpocApprove, Spoc_approve } from "../controllers/Spoc.js";

const router = Router();

// --- Public / Authentication Routes ---
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register/:email/:password/:role/:college/:college_code/:name/:date").post(signup);
// router.route("/register/:email/:password/:role/:manufacture/:college_code/:name/:date").post(signup);

router.route("/verify_email/:email").post(Verify_OTP);
router.route("/verify_otp").post(Verify_OTP_Check);
router.route("/cookie").get(Get_cookies); // Checks user authentication status

// --- Admin Routes ---
// Protected admin/SPOC routes
router.route("/addproblems").post(requireAuth, requireRole(['ADMIN','SPOC']), Post_problem);
router.route("/spoc_users").get(requireAuth, requireRole(['ADMIN']), Spoc_approve); // Get pending SPOC approvals
router.route("/handlespoc").post(requireAuth, requireRole(['ADMIN']), handleSpocApprove); // Approve or reject a SPOC
router.route("/get_all_users").get(requireAuth, requireRole(['ADMIN','EVALUATOR']), GetAllUsers); // Get all users
router.route("/submissions").get(Get_all_submissions); // Get all submissions from all teams

// --- SPOC Routes ---
router.route("/fetch_teams/:id").post(Fetch_Teams);
router.route("/fetch_team_members").post(Fetch_Team_Members);
router.route("/add_members/:id").post(Add_Team_Members);
router.route("/update_team").post(Update_team);
router.route("/delete_team").post(Delete_team);

// --- Student Routes ---
router.route("/submit_solution").post(SubmitSolution);

// --- Common/Shared Routes ---
router.route("/get_problems").get(Get_problems);
router.route("/problems/:id").get(Get_problem_by_id);

router.route("/evaluators").get(GetAllEvaluators);

export default router;
