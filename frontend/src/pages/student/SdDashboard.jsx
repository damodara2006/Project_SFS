import StudentNav from "../../components/StudentNav";
import TeamDetails from "./TeamDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SdDashboard = () => {
    return (
        <div >
            <Header />
            <StudentNav/>
            <TeamDetails/>
            <Footer />
        </div>
    )
}

export default SdDashboard;