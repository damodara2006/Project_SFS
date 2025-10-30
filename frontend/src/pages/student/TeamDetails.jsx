import React from 'react';

const TeamDetails = () => {
  const members = [
    { id: 1, role: "Team Lead", name: "Aarav Mehta", email: "aarav.mehta@example.com", phone: "+91 98765 43210", gender: "Male" },
    { id: 2, role: "Frontend Developer", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 99887 65432", gender: "Female" },
    { id: 3, role: "Backend Developer", name: "Rohan Das", email: "rohan.das@example.com", phone: "+91 91234 56789", gender: "Male" },
    { id: 4, role: "UI/UX Designer", name: "Neha Verma", email: "neha.verma@example.com", phone: "+91 97654 32109", gender: "Female" },
    { id: 5, role: "Data Analyst", name: "Aditya Nair", email: "aditya.nair@example.com", phone: "+91 98567 89012", gender: "Male" },
    { id: 6, role: "QA Engineer", name: "Kavya Reddy", email: "kavya.reddy@example.com", phone: "+91 93456 78901", gender: "Female" },
  ];

  return (
    <div className="m-10 mt-24 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
        Team Details
      </h1>

      {/* Team Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <div className="bg-white shadow-md border rounded-2xl p-4 text-center hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-600">Team Name</h2>
          <p className="text-xl font-bold text-[#ff9100] mt-2">Alpha Coders</p>
        </div>

        <div className="bg-white shadow-md border rounded-2xl p-4 text-center hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-600">Team Lead Name</h2>
          <p className="text-xl font-bold text-[#ff9100] mt-2">Aarav Mehta</p>
        </div>

        <div className="bg-white shadow-md border rounded-2xl p-4 text-center hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-600">Team ID</h2>
          <p className="text-xl font-bold text-[#ff9100] mt-2">SFS25001</p>
        </div>

        <div className="bg-white shadow-md border rounded-2xl p-4 text-center hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-600">College Name</h2>
          <p className="text-xl font-bold text-[#ff9100] mt-2">Knowledge Institute of Technology</p>
        </div>

        <div className="bg-white shadow-md border rounded-2xl p-4 text-center hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold text-gray-600">Mentor Name</h2>
          <p className="text-xl font-bold text-[#ff9100] mt-2">Mr. Praveen K AP/CSE</p>
        </div>
      </div>

      {/* Member Table */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Member Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
          <thead className="  bg-[#4a4a4a]">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-bold uppercase text-[#ff9100] ">Member Role</th>
              <th className="px-6 py-3 text-center text-sm font-bold uppercase text-[#ff9100]">Member Name</th>
              <th className="px-6 py-3 text-center text-sm font-bold uppercase text-[#ff9100]">Member Email</th>
              <th className="px-6 py-3 text-center text-sm font-bold uppercase text-[#ff9100]">Member Phone</th>
              <th className="px-6 py-3 text-center text-sm font-bold uppercase text-[#ff9100]">Member Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800 text-center">{m.role}</td>
                <td className="px-6 py-4 text-sm text-gray-800 text-center">{m.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800 text-center">{m.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800 text-center">{m.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-800 text-center">{m.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDetails;
