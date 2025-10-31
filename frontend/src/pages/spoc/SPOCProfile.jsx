import React, { useState } from "react";

const SPOCProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    phone: "",
    college: "Knowledge Institute of Technology",
    email: "sample@kiot.ac.in",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-24 w-full flex flex-col items-center justify-center bg-[#ffffff] text-[#4a4a4a] mb-10 ">
      <h1 className="text-4xl font-bold text-[#fc8f00] mb-10">SPOC Profile</h1>

      <div className="flex flex-col md:flex-row items-center justify-center bg-[#f8f8f8] border border-gray-300 rounded-2xl shadow-md p-10 w-11/12 md:w-3/4 lg:w-1/2 gap-10">

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative border-4 border-[#fc8f00] rounded-full h-40 w-40 overflow-hidden bg-gray-100 flex items-center justify-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[#4a4a4a] text-sm text-center">Upload Photo</span>
            )}
          </div>
          <label
            htmlFor="profile"
            className="mt-3 cursor-pointer bg-[#fc8f00] text-white px-4 py-2 rounded-lg hover:bg-[#e68100] transition"
          >
            Choose File
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg"
            id="profile"
            name="profile"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Profile Details Section */}
        <div className="flex flex-col gap-5 w-full">
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
            />
          </div>

          <div>
            <label className="font-semibold">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter Your Designation"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
            />
          </div>

          <div>
            <label className="font-semibold">Phone No</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc8f00]"
            />
          </div>

          <div>
            <label className="font-semibold">College Name</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-semibold">Email Id</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
                      <button className="bg-[#fc8f00] text-white px-4 py-2 rounded-lg hover:bg-[#e68100] transition curor-pointer">Submit</button>

      </div>

    </div>
  );
};

export default SPOCProfile;
