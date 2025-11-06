import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#4a4a4a] text-white py-8 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Social Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex justify-center md:justify-start gap-6 mb-5">
            <FaFacebook size={30} className="hover:text-[#ff9100] cursor-pointer transition-all duration-200" />
            <FaTwitter size={30} className="hover:text-[#ff9100] cursor-pointer transition-all duration-200" />
            <FaInstagram size={30} className="hover:text-[#ff9100] cursor-pointer transition-all duration-200" />
            <FaLinkedin size={30} className="hover:text-[#ff9100] cursor-pointer transition-all duration-200" />
          </div>
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Solve for Sakthi. All rights reserved.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center md:items-start">
          <span className="uppercase text-xl font-bold mb-3 text-[#fc8f00]">Contact Us</span>
          <p className="text-base text-gray-200">Email: info@solveforsakthi.com</p>
          <p className="text-base text-gray-200">Phone: +91 98765 43210</p>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center md:items-start">
          <span className="uppercase text-xl font-bold mb-3 text-[#fc8f00]">Stay Updated!</span>
          <p className="text-sm mb-4 text-gray-300 max-w-[300px]">
            Join our newsletter for the latest news and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[350px]">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-md bg-white text-gray-800 border border-gray-400 focus:outline-none focus:border-[#fc8f00] flex-grow"
            />
            <button className="bg-[#fc8f00] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#e07c00] transition duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line for small screens */}
      <div className="mt-6 border-t border-gray-500 pt-4 text-center text-sm text-gray-400 px-4">
        Designed with ❤️ by Solve for Sakthi Team
      </div>
    </footer>
  );
};

export default Footer;
