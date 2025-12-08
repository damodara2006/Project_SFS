import React from "react";
const TeamIcon = () => (
  <svg
    className="w-8 h-8 text-orange-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />{" "}
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const IdIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const CollegeIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />{" "}
  </svg>
);
const MentorIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const EmailIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
  </svg>
);
const PhoneIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />{" "}
  </svg>
);
const GenderIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {" "}
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />{" "}
  </svg>
);
const TeamDetails = () => {
  const members = [
    {
      id: 1,
      role: "Team Lead",
      name: "Aarav Mehta",
      email: "aarav.mehta@example.com",
      phone: "+91 98765 43210",
      gender: "Male",
    },
    {
      id: 2,
      role: "Frontend Developer",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 99887 65432",
      gender: "Female",
    },
    {
      id: 3,
      role: "Backend Developer",
      name: "Rohan Das",
      email: "rohan.das@example.com",
      phone: "+91 91234 56789",
      gender: "Male",
    },
    {
      id: 4,
      role: "UI/UX Designer",
      name: "Neha Verma",
      email: "neha.verma@example.com",
      phone: "+91 97654 32109",
      gender: "Female",
    },
  ];
  const metaDetails = [
    { label: "Team Name", value: "Alpha Coders", icon: <TeamIcon /> },
    { label: "Team Leader", value: "Aarav Mehta", icon: <UserIcon /> },
    { label: "Team ID", value: "SFS25001", icon: <IdIcon /> },
    {
      label: "College",
      value: "Knowledge Institute of Technology",
      icon: <CollegeIcon />,
    },
    { label: "Mentor", value: "Mr. Praveen K AP/CSE", icon: <MentorIcon /> },
  ];
  return (
    <div className="min-h-screen bg-white/50 py-10 px-6">
      {" "}
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* HEADER */}{" "}
        <header className="text-center mb-10">
          {" "}
          <div className="flex justify-center mb-3">
            {" "}
            <TeamIcon />{" "}
          </div>{" "}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
            Team Details
          </h1>{" "}
          <p className="text-gray-600 mt-2">
            Meet our team and explore their contributions & strengths
          </p>{" "}
        </header>{" "}
        {/* Team Meta */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="space-y-4">
            {metaDetails.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="text-orange-500">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-600 uppercase">
                    {item.label}
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-800 text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
        {/* TEAM MEMBERS */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Member Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {members.map((m) => {
              const initials = m.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              return (
                <div
                  key={m.id}
                  className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-orange-400 text-white flex items-center justify-center text-lg font-bold">
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {m.name}
                      </p>
                      <p className="text-sm text-gray-600">{m.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <p>
                      <EmailIcon className="inline mr-2" /> {m.email}
                    </p>
                    <p>
                      <PhoneIcon className="inline mr-2" /> {m.phone}
                    </p>
                    <p>
                      <GenderIcon className="inline mr-2" /> {m.gender}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
export default TeamDetails;
