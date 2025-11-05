// import { Get_cookies } from "../../backend/controllers/Cookie"

const URL = "http://localhost:8000"
const auth = () => {
    
    const match = document.cookie.match(new RegExp("(^| )" + "login_creditionals" + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;

}


export { URL, auth }