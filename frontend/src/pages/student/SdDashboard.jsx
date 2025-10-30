import StudentNav from "../../components/StudentNav";
import TeamDetails from "./TeamDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";

const SdDashboard = () => {
    const [shownav, setshownav] = useState(false);

    return (
        <div className="min-w-screen min-h-screen border-4 flex flex-col">
            <Header />

            <div className="pt-6 relative flex-1">
                {/* toggle button for nav */}
                <span
                    className="absolute top-4 right-6 text-white text-2xl cursor-pointer z-40"
                    onClick={() => setshownav(!shownav)}
                >
                    <FaGripLines />
                </span>

                {/* StudentNav (toggleable) */}
                {shownav && (
                    <div className="bg-orange-400 px-2 w-fit absolute z-30 top-14 right-4">
                        <StudentNav />
                    </div>
                )}

                {/* Team details always shown */}
                <div className="mt-8">
                    <TeamDetails />
                </div>
            </div>

            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}

export default SdDashboard;
