import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';


const TeamDetails = () => {
  return (
    <div>
        <Header />
        <div>
            <h1>Team Details</h1>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Member Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Member Role</th>
                        <th>Member Name</th>
                        <th>Member Email</th>
                        <th>Member Phone</th>
                        <th>Member Gender</th>
                    </tr>
                </thead>
            </table>
        </div>
        <Footer />
    </div>
  )
}

export default TeamDetails;