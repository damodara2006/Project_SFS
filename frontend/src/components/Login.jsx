import React from 'react';
import { useState } from 'react';

const Login = () => {

    const[role,setRole]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleLogin = ()=>{
       
    }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-96 shadow-lg">
        <h1 className="text-gray-800 text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="flex flex-col">
            <label htmlFor="role" className="text-gray-800 mb-1 text-sm font-medium">
              Select Your Role
            </label>
            <select
              id="role"
              name="role"
              className="p-2 rounded-md bg-transparent border border-gray-300 text-gray-700 focus:outline-none focus:border-[#fc8f00]"
              
            >
              <option value="Admin" className="text-black">Admin - SACL</option>
              <option value="Evaluator" className="text-black">Evaluator - SACL</option>
              <option value="spoc" className="text-black">SPOC</option>
              <option value="student" className="text-black">Student</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-800 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="p-2 rounded-md bg-transparent border border-gray-300 text-gray-800 focus:outline-none focus:border-[#fc8f00]"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-800 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-2 rounded-md bg-transparent border border-gray-300 text-gray-800 focus:outline-none focus:border-[#fc8f00]"
              onChange={(e)=>setPassword(e.target.value)}
           />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-[#fc8f00] text-sm hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#fc8f00] text-white font-semibold py-2 rounded-md mt-2 hover:bg-[#e07c00] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
