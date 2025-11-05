// import { Get_cookies } from "../../backend/controllers/Cookie"

const URL = "http://localhost:8000"
const auth = () => {
    
    const match = document.cookie.match("login_creditionals");
    // console.log()
        return match ? match : null;

}


export { URL, auth }