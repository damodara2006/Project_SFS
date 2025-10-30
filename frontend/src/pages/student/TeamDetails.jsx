import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const TeamDetails = () => {

    const member = [
        { id: 1, role: "Team Lead", name: "Aarav Mehta", email: "aarav.mehta@example.com", phone: "+91 98765 43210", gender: "Male" },
        { id: 2, role: "Frontend Developer", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 99887 65432", gender: "Female" },
        { id: 3, role: "Backend Developer", name: "Rohan Das", email: "rohan.das@example.com", phone: "+91 91234 56789", gender: "Male" },
        { id: 4, role: "UI/UX Designer", name: "Neha Verma", email: "neha.verma@example.com", phone: "+91 97654 32109", gender: "Female" },
        { id: 5, role: "Data Analyst", name: "Aditya Nair", email: "aditya.nair@example.com", phone: "+91 98567 89012", gender: "Male" },
        { id: 6, role: "QA Engineer", name: "Kavya Reddy", email: "kavya.reddy@example.com", phone: "+91 93456 78901", gender: "Female" },
    ];

    return (
        <div>
            <Header />
            <div>
                <h1 className='text-center text-3xl font-bold'>Team Details</h1>
                <div className='flex gap-16 m-8'>
                    <div className='border-2 h-40 w-60'>
                        <span className='font-bold text-2xl'>Team Name</span>
                        <br />
                        <span className='font-bold text-xl'>Alpha Coders</span>
                    </div>
                    <div className='border-2 h-40 w-60'>
                        <span className='font-bold text-2xl'>Team Leader</span>
                        <br />
                        <span className='font-bold text-xl'>Aarav Mehta</span>
                    </div>
                    <div className='border-2 h-40 w-60'>
                        <span className='font-bold text-2xl'>Team Id</span>
                        <br />
                        <span className='font-bold text-xl'>SFS25001</span>
                    </div>
                    <div className='border-2 h-40 w-60'>
                        <span className='font-bold text-2xl'>College Name</span>
                        <br />
                        <span className='font-bold text-xl'>Knowledge Institute of Technology</span>
                    </div>
                    <div className='border-2 h-40 w-60'>
                        <span className='font-bold text-2xl'>Mentor Name</span>
                        <br />
                        <span className='font-bold text-xl'>Mr.Praveen K AP/CSE</span>
                    </div>
                </div>
                <h1 className='text-3xl text-center font-bold'>Member Details</h1>
                <table className='border-2 w-[80%] mx-auto mt-8 text-center'>
                    <thead className='bg-gray-300 p-2 border-2 m-2 '>
                        <tr className='mt-2'>
                            <th>Member Role</th>
                            <th>Member Name</th>
                            <th>Member Email</th>
                            <th>Member Phone</th>
                            <th>Member Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {member.map((m) => (
                            <tr key={m.id}>
                                <td>{m.role}</td>
                                <td>{m.name}</td>
                                <td>{m.email}</td>
                                <td>{m.phone}</td>
                                <td>{m.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default TeamDetails;