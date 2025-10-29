import React, { useState } from 'react'
import sakthi from "../assets/Pasted image.png"
import profile from "../assets/profile.png"

const Header = () => {
  const [Active, SetActive] = useState("");

  const handle_active = (name) => {
    SetActive(name);
  }

  return (
    <div className='fixed h-16 min-w-screen border border-gray-100 bg-gray-50 '>

      <nav className='flex items-center justify-between w-[100%] h-full '>
        <div className=' flex ml-14  w-[20%]'><img src={sakthi} alt="Sakthi groups" className='w-20 rounded-sm h-14' /></div>
        <div className='w-[80%] h-10'>
          <ul className='flex  h-full items-center justify-between w-[100%] right-0'>
            <li className={` w-full h-full flex items-center justify-center cursor-pointer active:bg-gray-300 hover:bg-gray-300 mr-2 rounded-md font-semibold transition-all ${Active == 'Home' ? 'scale-105 bg-gray-400 hover:bg-gray-400' : ""} `} onClick={()=>handle_active("Home")} >Home</li>
            <li className={` w-full h-full flex items-center mr-2 justify-center cursor-pointer active:bg-gray-300 hover:bg-gray-300 rounded-md font-semibold transition-all ${Active == 'About us' ? 'scale-105 bg-gray-400 hover:bg-gray-400' : ""} `} onClick={() => handle_active("About us")} >About Us</li>
            <li className={` w-full h-full mr-2 flex items-center justify-center cursor-pointer active:bg-gray-300 hover:bg-gray-300 rounded-md font-semibold transition-all ${Active == 'Problem Statement' ? 'scale-105 bg-gray-400 hover:bg-gray-400' : ""} `} onClick={() => handle_active("Problem Statement")} >Problem Statement</li>
            <li className={` w-full h-full flex  mr-2 items-center justify-center cursor-pointer active:bg-gray-300 hover:bg-gray-300 rounded-md font-semibold transition-all ${Active == 'FAQ' ? 'scale-105 bg-gray-400 hover:bg-gray-400' : ""} `} onClick={() => handle_active("FAQ")} >FAQ</li>
            <li className={` w-full h-full mr-2 flex items-center justify-center cursor-pointer active:bg-gray-300 hover:bg-gray-300 rounded-md font-semibold transition-all ${Active == 'Profile' ? 'scale-105 bg-gray-400 hover:bg-gray-400' : ""} `} onClick={() => handle_active("Profile")} >Profile</li>
           
            <img src={profile} className='w-10 h-10 mr-5 hover:scale-110 transition-all duration-100 ml-5' alt="profile" />
          </ul>
        </div>
      </nav>
    </div> 
  )
}

export default Header 