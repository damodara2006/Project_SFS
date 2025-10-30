import React, { useState } from 'react'
import sakthi from "../assets/Pasted image.png"
import profile from "../assets/profile.png"
import skathiauto from "../assets/sakthi_auto.png"

const Header = () => {
  const [Active, SetActive] = useState("");

  const handle_active = (name) => {
    SetActive(name);
  }

  return (
    <div className='fixed h-20 min-w-screen bg-[#494949] font-roboto text-md'>

      <nav className='flex items-center justify-between w-[100%] h-full'>
        <div className=' flex ml-14  w-[20%]'><img src={skathiauto} alt="Sakthi groups" className='w-32 rounded-sm h-14' /></div>
        <div className='w-[80%]  h-full mr-10'>
          <ul className='flex  items-center h-[100%] justify-between w-[100%] right-0 text-white'>
            <li className={` w-full   flex items-center justify-center cursor-pointer  h-[100%]  after:bottom-0 hover:text-orange-400 after:content-['']  mr-2  font-semibold transition-all ${Active == 'Home' ? 'scale-105  after:absolute border-b-2 after:block after:border-b-2 after:bottom-0  after:w-full after:border-orange-400 text-orange-400 after:bg-orange-400 after:z-50' : ""} `} onClick={()=>handle_active("Home")} >Home</li>
            <li className={` w-full  flex items-center justify-center cursor-pointer  h-[100%]  after:bottom-0 hover:text-orange-400 after:content-['']  mr-2 font-semibold transition-all ${Active == 'About us' ? 'scale-105  after:absolute border-b-2 after:block after:border-b-2 after:bottom-0  after:w-full after:border-orange-400 text-orange-400 after:bg-orange-400 after:z-50' : ""} `} onClick={() => handle_active("About us")} >About Us</li>
            <li className={` w-full  flex items-center justify-center cursor-pointer  h-[100%]  after:bottom-0 hover:text-orange-400 after:content-['']  mr-2 font-semibold transition-all ${Active == 'Problem Statement' ? ' scale-105  after:absolute border-b-2 after:block after:border-b-2 after:bottom-0  after:w-full after:border-orange-400 text-orange-400 after:bg-orange-400 after:z-50' : ""} `} onClick={() => handle_active("Problem Statement")} >Problem Statement</li>
            <li className={` w-full  flex items-center justify-center cursor-pointer  h-[100%]  after:bottom-0 hover:text-orange-400 after:content-['']  mr-2 font-semibold transition-all ${Active == 'FAQ' ? 'scale-105  after:absolute border-b-2 after:block after:border-b-2 after:bottom-0  after:w-full after:border-orange-400 text-orange-400 after:bg-orange-400 after:z-50' : ""} `} onClick={() => handle_active("FAQ")} >FAQ</li>
            <li className={` w-full  flex items-center justify-center cursor-pointer  h-[100%]  after:bottom-0 hover:text-orange-400 after:content-['']  mr-2 font-semibold transition-all ${Active == 'Profile' ? 'scale-105  after:absolute border-b-2 after:block after:border-b-2 after:bottom-0  after:w-full after:border-orange-400 text-orange-400 after:bg-orange-400 after:z-50' : ""} `} onClick={() => handle_active("Profile")} >Profile</li>
           
            {/* <img src={profile} className='w-10 h-10 mr-5 e-110 transition-all duration-100 ml-5' alt="profile" /> */}
          </ul>
        </div>
      </nav>
    </div> 
  )
}

export default Header 