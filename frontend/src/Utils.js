// import { Get_cookies } from "../../backend/controllers/Cookie"

import axios from "axios";

const URL = "https://project-sfs-backend.onrender.com"
const auth = async () => {
    const match = document.cookie.match("login_creditionals");

    if (!match) return null; 
    try {
        axios.defaults.withCredentials = true
        const res = await axios.get(`${URL}/cookie`);
        console.log(res.data.ROLE);
        return res.data.ROLE; 
    } catch (error) {
        console.error("Error during auth:", error);
        return null;
    }
};


export { URL, auth }