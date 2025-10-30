import StudentNav from "../../components/StudentNav";
import TeamDetails from "./TeamDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";

const SdDashboard = () => {
    const[shownav, setshownav] = useState(false)
    return (
        <div  className="min-w-screen min-h-screen border-4">
            <Header />
            
            {
                shownav ? <div className="bg-orange-400  px-2  w-fit absolute z-30 top-21 right-0"><StudentNav />  </div> : ""
            }
            <div className="pt-22 relative"><TeamDetails /> <span className="absolute top-7 right-10 text-white text-2xl" onClick={()=>setshownav(!shownav)}><FaGripLines /></span></div>
            <div className="bottom-0 w-full fixed"> <Footer /></div>
        </div>
    )
}

export default SdDashboard;