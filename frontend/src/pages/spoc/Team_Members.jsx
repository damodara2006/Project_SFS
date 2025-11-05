import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import URL from '../../Utils';
import { useLocation } from 'react-router-dom';
function Team_Members() {
    const params = useParams()
    const navigate = useNavigate()
    const [spoc_id, setspoc_id] = useState()
    const location = useLocation()
    const ID = location.state.id
    // console.log(params)
    const [FullTeam, setFullTeam] = useState([]);
    
    // console.log(params.id);
    axios.defaults.withCredentials = true
    axios.get(`${URL}/cookie`).then(res => setspoc_id(res.data.ID));
    
    
        axios.post(`${URL}/fetch_team_members`,{id:ID}).then(res => setFullTeam(res.data))

    // console.log(FullTeam)
  return (
      <div className='min-h-screen min-w-screen border mt-20'>
          <div className='flex text-center items-center  justify-between h-10'> <h2 className="text-xl  font-semibold text-gray-800   ml-2">
              Team Details
          </h2>
              <h2 className="text-lg text-blue-700 hover:underline cursor-pointer mb-0.5  font-light text-right   mr-10" onClick={()=>navigate("/spoc/team")}>
                  Back to Team
              </h2></div>
         
          {
              FullTeam.length >  0 ? <table className="min-w-full border border-gray-200">
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
              </table> : <div className="rounded border bg-white shadow-sm p-8 text-center">
                  <svg
                      className="mx-auto h-8 w-8 animate-spin text-[#0f62fe]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      />
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                  </svg>
                  <div className="mt-3 text-sm text-[#4a4a4a]">Loading team details...</div>
              </div>
          }
    </div>
  )
}

export default Team_Members
