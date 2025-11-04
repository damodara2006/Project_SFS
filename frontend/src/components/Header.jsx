import { useState } from "react";
import profile from "../assets/profile.png";
import skathiauto from "../assets/sakthi_auto.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Problem Statement", path: "/problemstatements" },
    // { name: "FAQ", path: "/faq" },
    { name: "Profile", path: "/profile" },
  ];

  const handleNavClick = (item) => {
    setActive(item.name);
    navigate(item.path);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#494949] text-white font-roboto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <img src={skathiauto} alt="Sakthi groups" className="w-32 h-14 rounded-sm" />
          </div>

          {/* Center: Navigation (desktop) */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center space-x-2 w-full max-w-3xl justify-center">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={
                    `relative px-4 py-2 cursor-pointer text-sm font-semibold rounded-md transition-all transform select-none ` +
                    (active === item.name
                      ? "text-orange-400 scale-105 border-b-2 border-orange-400"
                      : "hover:text-orange-400 hover:scale-105")
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: profile + mobile toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick({ name: "Profile", path: "/profile" })}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-md hover:brightness-110 transition"
              aria-label="Open profile"
            >
              <img src={profile} alt="profile" className="w-10 h-10 rounded-full ring-1 ring-white/20" />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/5 transition"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-[#494949] border-t border-white/5 overflow-hidden transition-all ${
          mobileOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <li
              key={item.name + "-mobile"}
              onClick={() => handleNavClick(item)}
              className={
                `w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ` +
                (active === item.name ? "text-orange-400 bg-white/5" : "hover:text-orange-400 hover:bg-white/3")
              }
            >
              {item.name}
            </li>
          ))}
          <li className="px-3 pt-2">
            <button
              onClick={() => handleNavClick({ name: "Profile", path: "/profile" })}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 transition"
            >
              <img src={profile} alt="profile" className="w-9 h-9 rounded-full ring-1 ring-white/20" />
              <span className="text-sm font-semibold">Profile</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
