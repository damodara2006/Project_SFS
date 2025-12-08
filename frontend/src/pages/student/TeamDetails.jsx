import React from 'react';

const TeamDetails = () => {
  const members = [
    { id: 1, role: "Team Lead", name: "Aarav Mehta", email: "aarav.mehta@example.com", phone: "+91 98765 43210", gender: "Male" },
    { id: 2, role: "Frontend Developer", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 99887 65432", gender: "Female" },
    { id: 3, role: "Backend Developer", name: "Rohan Das", email: "rohan.das@example.com", phone: "+91 91234 56789", gender: "Male" },
    { id: 4, role: "UI/UX Designer", name: "Neha Verma", email: "neha.verma@example.com", phone: "+91 97654 32109", gender: "Female" },
    
  ];

    return (
        <div className="min-h-screen bg-white/50 p-6 ">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-center text-3xl font-extrabold text-gray-900 mt-8">Team Details</h1>
                </header>

                {/* Team meta */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                    {[
                        { label: "Team Name", value: "Alpha Coders" },
                        { label: "Team Leader", value: "Aarav Mehta" },
                        { label: "Team Id", value: "SFS25001" },
                        { label: "College Name", value: "Knowledge Institute of Technology" },
                        { label: "Mentor Name", value: "Mr.Praveen K AP/CSE" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex flex-col justify-center border border-gray-200 rounded-lg p-4 bg-white shadow-[4px_4px_8px_#fc9300]/20 hover:shadow-[6px_6px_10px_#fc9300]/60 transition-transform transform hover:-translate-y-1 duration-300"

                        >
                            <span className="text-sm font-medium text-gray-500 uppercase">{item.label}</span>
                            <span className="mt-2 text-lg font-semibold text-gray-800">{item.value}</span>
                        </div>
                    ))}
                </section>

                {/* Members */}
                <section>
                    <h2 className="text-2xl text-center font-bold text-gray-900 mb-4">Member Details</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member Gender</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {members.map((m) => {
                                    const initials = m.name
                                        .split(' ')
                                        .map(part => part[0])
                                        .join('')
                                        .slice(0, 2)
                                        .toUpperCase();
                                    return (
                                        <tr key={m.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 align-middle text-sm text-gray-700">{m.role}</td>
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{m.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-middle text-sm text-gray-600">{m.email}</td>
                                            <td className="px-6 py-4 align-middle text-sm text-gray-600">{m.phone}</td>
                                            <td className="px-6 py-4 align-middle text-sm text-gray-600">{m.gender}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeamDetails;
