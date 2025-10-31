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
    <div className="w-full flex justify-center px-4 mt-10 mb-10">
      <div className="max-w-4xl w-full">
        <header className="mb-6 text-center mt-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fc8f00] to-[#ffb347]">
            SPOC Profile
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Keep your information up to date so students can reach you easily.
          </p>
        </header>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Profile Picture */}
          <div className="flex-shrink-0 w-full md:w-40 flex flex-col items-center">
            <div className="relative rounded-full w-40 h-40 p-1 bg-gradient-to-br from-[#ffedd5] via-[#ffe4c4] to-[#fff2e6]">
              <div className="h-full w-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm">Upload Photo</span>
                  </div>
                )}
              </div>
            </div>

            <label
              htmlFor="profile"
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#fc8f00] to-[#ffb347] text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:scale-[1.01] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L3 9.828" />
              </svg>
              Choose Photo
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg"
              id="profile"
              name="profile"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Upload profile photo (JPEG only)"
            />
            <p className="text-xs text-gray-400 mt-2 text-center">JPEG only • Recommended 400x400px</p>
          </div>

          {/* Right: Details */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd0a0]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone No</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd0a0]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Designation</label>
              <input
                type="text"
                name="phone"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter your designation"
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd0a0]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  disabled
                  className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email Id</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fc8f00] to-[#ffb347] text-white px-5 py-2 rounded-lg font-medium shadow hover:brightness-95 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPOCProfile;
