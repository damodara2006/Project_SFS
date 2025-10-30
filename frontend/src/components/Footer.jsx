import { FaFacebook } from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa6';

const Footer = () => {
  return (
    <>
      <footer className="bg-[#4a4a4a] text-white py-4 w-full">
        <div className="container flex flex-col md:flex-row justify-evenly items-center md:items-start mx-auto text-center md:text-left px-4">
            <div className="flex flex-col justify-center items-center mb-6 md:mb-0 md:w-1/3">

              {/* Icons go here */}
              <div className="flex justify-around w-full max-w-[250px] h-max mb-6">
                <FaFacebook size={35}/>
                <FaTwitter size={35}/>
                <FaInstagram size={35}/>
                <FaLinkedin size={35}/>
              </div>

              {/* Copyright notice */}
              <p>&copy; {new Date().getFullYear()} Solve for Sakthi. All rights reserved.</p>
            </div>
            <div className='flex flex-col items-center md:items-start mb-6 md:mb-0 md:w-1/3'>
              <span className='uppercase text-2xl font-bold mb-2 text-[#fc8f00]'>Contact Us</span>
              <p className='text-base'>Email: info@solveforsakthi.com</p>
              <p className='text-base'>Phone: +1 (123) 456-7890</p>
            </div>
            <div className='flex flex-col items-center md:items-start mt-6 md:mt-0'>
              <span className='uppercase text-2xl font-bold mb-2 text-[#fc8f00]'>Stay Updated!</span>
              <p className='text-sm mb-3 text-gray-300'>
                Join our newsletter for the latest news and updates.
              </p>
              <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <input
                  type='email'
                  placeholder='Your email address'
                  className='p-2 rounded-md bg-white text-gray-800 border border-gray-600 focus:outline-none focus:border-[#fc8f00] flex-grow'
                />
                <button className='bg-[#fc8f00] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#e07c00] transition duration-200'>
                  Subscribe
                </button>
              </div>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer