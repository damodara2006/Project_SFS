# Solve For Sakthi — Frontend (React + Vite)

Short description
-----------------
Solve For Sakthi is a React single-page application scaffolded with Vite. It provides UI for browsing problem statements, submitting student solutions (file upload), team management views, and SPOC/admin dashboards. The UI uses Tailwind CSS for styling and includes small utility components (search, auth forms, header/footer).

Tech stack
----------
- React (hooks) — see [`frontend/src/main.jsx`](frontend/src/main.jsx) and [`frontend/src/App.jsx`](frontend/src/App.jsx)  
- Vite — configured in [`frontend/vite.config.js`](frontend/vite.config.js)  
- Tailwind CSS — classes across components; dependency in [`frontend/package.json`](frontend/package.json)  
- Framer Motion — animations in several components (e.g. [`frontend/src/pages/spoc/SpocDashboard.jsx`](frontend/src/pages/spoc/SpocDashboard.jsx))  
- react-router-dom — client side routing used in [`frontend/src/App.jsx`](frontend/src/App.jsx) and [`frontend/src/components/ProblemStatements.jsx`](frontend/src/components/ProblemStatements.jsx)  
- react-icons — icons used in header/footer and other components (e.g. [`frontend/src/components/Footer.jsx`](frontend/src/components/Footer.jsx))  
- zod — runtime validation in [`frontend/src/components/Register.jsx`](frontend/src/components/Register.jsx)  
- XMLHttpRequest / FormData — file uploads in [`frontend/src/pages/student/Upload.jsx`](frontend/src/pages/student/Upload.jsx)

Project structure overview (auto-generated)
------------------------------------------
frontend/
- index.html — app entry. See [`frontend/index.html`](frontend/index.html)
- package.json — frontend deps and scripts. See [`frontend/package.json`](frontend/package.json)
- vite.config.js — vite + plugins. See [`frontend/vite.config.js`](frontend/vite.config.js)
- src/
  - main.jsx — app bootstrap. [`frontend/src/main.jsx`](frontend/src/main.jsx)
  - index.css — global CSS & Tailwind import. [`frontend/src/index.css`](frontend/src/index.css)
  - App.jsx — routes and global layout. [`frontend/src/App.jsx`](frontend/src/App.jsx)
  - components/
    - [`Header`](frontend/src/components/Header.jsx) — top navigation, responsive mobile drawer, uses `useNavigate` from `react-router-dom`. State: active, mobileOpen.
    - [`Footer`](frontend/src/components/Footer.jsx) — footer with social icons (react-icons).
    - [`SearchBar`](frontend/src/components/SearchBar.jsx) — controlled search input. Hooks: useState(searchTerm). Calls console.log on search.
    - [`Login`](frontend/src/components/Login.jsx) — login form, local state for role/email/password via useState.
    - [`Register`](frontend/src/components/Register.jsx) — registration form using `zod` for validation. Hooks: useState(form, errors).
    - [`ProblemStatements`](frontend/src/components/ProblemStatements.jsx) — table of hardcoded problems, modal detail view, uses `useNavigate` to route to submit flow.
    - [`StudentNav`](frontend/src/components/StudentNav.jsx) — student tab navigation that shows ProblemStatements / My Submission / Team Details. Hooks: useState(active).
  - pages/
    - Home.jsx — landing page with [`SearchBar`](frontend/src/components/SearchBar.jsx). [`frontend/src/pages/Home.jsx`](frontend/src/pages/Home.jsx)
    - Admin/
      - [`AdDashboard`](frontend/src/pages/Admin/AdDashboard.jsx) — placeholder admin dashboard. [`frontend/src/pages/Admin/AdDashboard.jsx`](frontend/src/pages/Admin/AdDashboard.jsx)
      - [`Profile`](frontend/src/pages/Admin/Profile.jsx) — admin profile placeholder. [`frontend/src/pages/Admin/Profile.jsx`](frontend/src/pages/Admin/Profile.jsx)
    - student/
      - [`SdDashboard`](frontend/src/pages/student/SdDashboard.jsx) — student dashboard wrapper that mounts [`StudentNav`](frontend/src/components/StudentNav.jsx). Hooks: none special.
      - [`Upload`](frontend/src/pages/student/Upload.jsx) — file upload UI with drag/drop, previews, upload progress (XMLHttpRequest). Hooks/state: useState(files, previews, progress, status, dragActive, title, description, link), useRef(inputRef), useEffect(for previews). Integrations: POST to `/api/upload` via XMLHttpRequest/FormData. [`frontend/src/pages/student/Upload.jsx`](frontend/src/pages/student/Upload.jsx)
      - [`Student_submitions`](frontend/src/pages/student/Student_submitions.jsx) — view submitted solution (embeds PDF via <object>). Imports sample PDF asset. [`frontend/src/pages/student/Student_submitions.jsx`](frontend/src/pages/student/Student_submitions.jsx)
      - [`TeamDetails`](frontend/src/pages/student/TeamDetails.jsx) — team members table. Hooks: none special. [`frontend/src/pages/student/TeamDetails.jsx`](frontend/src/pages/student/TeamDetails.jsx)
    - spoc/
      - [`SpocDashboard`](frontend/src/pages/spoc/SpocDashboard.jsx) — SPOC dashboard with sidebar navigation, paginated team list, and subviews (Problems, Profile). Hooks/state: useState(currentPage, activeView). Uses framer-motion for animations. [`frontend/src/pages/spoc/SpocDashboard.jsx`](frontend/src/pages/spoc/SpocDashboard.jsx)
      - [`SPOCProfile`](frontend/src/pages/spoc/SPOCProfile.jsx) — SPOC profile form with profile image preview (URL.createObjectURL). Hooks: useState(profilePic, formData). [`frontend/src/pages/spoc/SPOCProfile.jsx`](frontend/src/pages/spoc/SPOCProfile.jsx)
      - [`TeamList`](frontend/src/pages/spoc/TeamList.jsx) — team list with animated tabs and detail drill-down. Hooks: useState(active, selectedTeam). Uses framer-motion. [`frontend/src/pages/spoc/TeamList.jsx`](frontend/src/pages/spoc/TeamList.jsx)
      - [`ViewSubmit`](frontend/src/pages/spoc/ViewSubmit.jsx) — placeholder. [`frontend/src/pages/spoc/ViewSubmit.jsx`](frontend/src/pages/spoc/ViewSubmit.jsx)
      - [`Problem`](frontend/src/pages/spoc/Problem.jsx) — placeholder. [`frontend/src/pages/spoc/Problem.jsx`](frontend/src/pages/spoc/Problem.jsx)

Agents and external integrations
-------------------------------
- Upload endpoint: the upload UI in [`Upload`](frontend/src/pages/student/Upload.jsx) sends a POST to `/api/upload` using `XMLHttpRequest` and FormData — backend endpoint expected to handle file uploads.
- Navigation: `react-router-dom` is used across the app; [`App.jsx`](frontend/src/App.jsx) defines routes like `/student`, `/spoc`, and `/student/submit-solution`.
- Validation: `zod` is used in [`Register`](frontend/src/components/Register.jsx) for client-side validation.
- Animations: `framer-motion` used in [`StudentNav`](frontend/src/components/StudentNav.jsx), [`SpocDashboard`](frontend/src/pages/spoc/SpocDashboard.jsx), and [`TeamList`](frontend/src/pages/spoc/TeamList.jsx).
- Icons: `react-icons` used in header/footer and elsewhere (see [`frontend/src/components/Footer.jsx`](frontend/src/components/Footer.jsx) and [`frontend/src/components/Header.jsx`](frontend/src/components/Header.jsx)).
- Static assets: sample PDF and images are imported in pages like [`Student_submitions`](frontend/src/pages/student/Student_submitions.jsx) and [`SPOCProfile`](frontend/src/pages/spoc/SPOCProfile.jsx).

Note: there are no AI agents (OpenAI, etc.) integrated in the codebase.

Setup instructions
------------------
1. Frontend
   - cd frontend
   - Install deps:
     ```
     npm install
     ```
   - Run dev server:
     ```
     npm run dev
     ```
   - Build:
     ```
     npm run build
     ```
   - Lint:
     ```
     npm run lint
     ```

2. Backend (basic)
   - cd backend
   - Install deps:
     ```
     npm install
     ```
   - Environment variable:
     - BACKEND_PORT — port to run the backend (e.g. 5000)
   - Start (simple):
     ```
     node [index.js](http://_vscodecontentref_/0)
     ```
   - Notes: backend entry is at [`backend/app/index.js`](backend/app/index.js). There are a couple of issues to address before production run:
     - `Process` is used instead of `process` in [`backend/app/index.js`](backend/app/index.js) — change to `process.env.BACKEND_PORT`.

Usage guide (main features)
---------------------------
- Browse problems: open Home or Student dashboard → Problem Statements. See [`frontend/src/components/ProblemStatements.jsx`](frontend/src/components/ProblemStatements.jsx). Click "View" to open modal; "Submit" navigates to submit page.
- Submit solution (student):
  - Route: `/student/submit-solution` served by [`frontend/src/pages/student/Upload.jsx`](frontend/src/pages/student/Upload.jsx).
  - Features: drag & drop, file previews for images, multiple files, title/description/link fields, upload progress shown via progress bar. Uploads to `/api/upload` via XMLHttpRequest.
- Team views:
  - Student team details: [`frontend/src/pages/student/TeamDetails.jsx`](frontend/src/pages/student/TeamDetails.jsx).
  - SPOC team list and member drill-down: [`frontend/src/pages/spoc/TeamList.jsx`](frontend/src/pages/spoc/TeamList.jsx).
- SPOC dashboard: see [`frontend/src/pages/spoc/SpocDashboard.jsx`](frontend/src/pages/spoc/SpocDashboard.jsx) for team stats and pagination UI.

Developer notes
---------------
- Routes are declared in [`frontend/src/App.jsx`](frontend/src/App.jsx). Update routes there when adding pages/components.
- Reusable components:
  - [`Header`](frontend/src/components/Header.jsx) and [`Footer`](frontend/src/components/Footer.jsx) are mounted globally in [`App.jsx`](frontend/src/App.jsx).
  - [`ProblemStatements`](frontend/src/components/ProblemStatements.jsx) is reused in both student and SPOC flows.
  - [`SearchBar`](frontend/src/components/SearchBar.jsx) is a small controlled input used on Home and inside student flows.
- Forms:
  - Register uses `zod` schema in [`frontend/src/components/Register.jsx`](frontend/src/components/Register.jsx) for validation. Maintain schema and use safeParse for robust checks.
  - Upload uses FormData and XMLHttpRequest for progress events — if switching to fetch, consider using `axios` or fetch with progress polyfills.
- Styling:
  - Tailwind classes are used throughout; base imports exist in [`frontend/src/index.css`](frontend/src/index.css). Ensure Tailwind is correctly configured in project if you extend classes.
- Animations:
  - `framer-motion` is used for enter/exit and card/table animations. Keep transitions small to preserve responsiveness.

Quick file links (most-referenced)
----------------------------------
- [`frontend/src/App.jsx`](frontend/src/App.jsx) — routing
- [`frontend/src/main.jsx`](frontend/src/main.jsx) — app bootstrap
- Components:
  - [`Header`](frontend/src/components/Header.jsx)
  - [`Footer`](frontend/src/components/Footer.jsx)
  - [`SearchBar`](frontend/src/components/SearchBar.jsx)
  - [`Login`](frontend/src/components/Login.jsx)
  - [`Register`](frontend/src/components/Register.jsx)
  - [`ProblemStatements`](frontend/src/components/ProblemStatements.jsx)
  - [`StudentNav`](frontend/src/components/StudentNav.jsx)
- Pages:
  - Student: [`SdDashboard`](frontend/src/pages/student/SdDashboard.jsx), [`Upload`](frontend/src/pages/student/Upload.jsx), [`Student_submitions`](frontend/src/pages/student/Student_submitions.jsx), [`TeamDetails`](frontend/src/pages/student/TeamDetails.jsx)
  - SPOC: [`SpocDashboard`](frontend/src/pages/spoc/SpocDashboard.jsx), [`SPOCProfile`](frontend/src/pages/spoc/SPOCProfile.jsx), [`TeamList`](frontend/src/pages/spoc/TeamList.jsx)
  - Admin: [`AdDashboard`](frontend/src/pages/Admin/AdDashboard.jsx), [`Profile`](frontend/src/pages/Admin/Profile.jsx)
