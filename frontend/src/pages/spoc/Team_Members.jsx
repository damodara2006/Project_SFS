import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import URL from '../../Utils';
function Team_Members() {
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)
    const [FullTeam, setFullTeam] = useState([]);
    
        console.log(params.id);
        axios.post(`${URL}/fetch_team_members/${params.id}`).then(res => setFullTeam(res.data))

    console.log(FullTeam)
  return (
      <div className='min-h-screen min-w-screen border mt-20'>
          <div className='flex text-center items-center  justify-between h-10'> <h2 className="text-xl  font-semibold text-gray-800   ml-2">
              Team Details
          </h2>
              <h2 className="text-lg text-blue-700 hover:underline cursor-pointer mb-0.5  font-light text-right   mr-10" onClick={()=>navigate("/spoc/team")}>
                  Back to Team
              </h2></div>
         
          <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Gender
                      </th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {FullTeam.map((m, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm text-gray-700">
                              {m.ROLE}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                              {m.NAME}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                              {m.EMAIL}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                              {m.PHONE}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                              {m.GENDER}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
    </div>
  )
}

export default Team_Members
