// import { Get_cookies } from "../../backend/controllers/Cookie"

import axios from "axios";

const URL = "https://project-sfs-backend.onrender.com"
const auth = async () => {
    try {
        const res = await axios.get(`${URL}/cookie`, {
            withCredentials: true
        });

        return res.data.ROLE || null;

    } catch (err) {
        console.error(err);
        return null;
    }
};


export { URL, auth }