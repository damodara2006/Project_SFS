// import { Get_cookies } from "../../backend/controllers/Cookie"

import axios from "axios";

const URL = import.meta.env.VITE_API_URL
const auth = async () => {
    

   ; 
    try {
        const res = await axios.get(`${URL}/cookie`, { withCredentials: true });
        console.log(res.data.ROLE);
        return res.data.ROLE; 
    } catch (error) {
        console.error("Error during auth:", error);
        return null;
    }
};


export { URL, auth }