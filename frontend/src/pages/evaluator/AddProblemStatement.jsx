import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { URL } from "../../Utils";
const AddProblemStatement = () => {

    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[dept,setDept]=useState("");
    const[subDate,setSubDate]=useState("");

    const[reference,setReference]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(title,description,dept,reference,subDate);
        try{
           const response = await axios.post(`${URL}/addproblems`,{
            title:title,
            description:description,
            sub_date:subDate,
            dept:dept,
            reference:reference
            
           });
           console.log("Problem Statement Added:",response.data);
        }
        catch(error){
            console.error("Error adding problem statement:",error);
        }
    }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-xl w-full max-w-3xl p-8">
          

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Problem Statement Title"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Describe the Problem Statement"
                rows="4"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Department */}
             <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                placeholder="Enter Department"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e)=>setDept(e.target.value)}
              />
            </div>


            
            {/* Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reference Link
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e)=>setReference(e.target.value)}
              />
            </div>

            {/* Submission Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Submission DeadLine
              </label>
              <input
                type="date"
                placeholder="Submission Deadline"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                onChange={(e)=>setSubDate(e.target.value)}
              />
            </div>

            

            
            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProblemStatement;
