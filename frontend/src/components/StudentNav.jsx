import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Student_submitions from '../pages/student/Student_submitions'
import TeamDetails from '../pages/student/TeamDetails'
import ProblemSubmit from '../pages/student/ProblemStudent'

const StudentNav = () => {
  const [active, setActive] = useState('Problem Statements')

  const tabs = ['Problem Statements', 'My Submission', 'Team Details']
  return (
    <div className="min-h-screen flex pt-20">
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Tabs bar */}
          <div className="bg-gray-100 rounded-md p-3 mb-4 flex justify-center">
            <div className="flex gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`px-6 py-2 rounded-md font-medium transition ${
                    active === t
                      ? 'bg-white text-[#4a4a4a] shadow'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="mb-6">
            {active === 'Problem Statements' && (
              <>
                <SearchBar />
                {/* Put your Problem Statements content here */}
                <div className="mt-4 p-4 bg-white rounded shadow">
                  <ProblemSubmit/>
                </div>
              </>
            )}

            {active === 'My Submission' && (
              <div className="mt-4">
                <Student_submitions />
              </div>
            )}

            {active === 'Team Details' && (
              <div className="mt-4">
                <TeamDetails />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentNav