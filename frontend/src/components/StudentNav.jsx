import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Student_submitions from '../pages/student/Student_submitions'
import TeamDetails from '../pages/student/TeamDetails'
import ProblemStatements from './ProblemStatements'

const StudentNav = () => {
  const [active, setActive] = useState('Problem Statements')

  const tabs = ['Problem Statements', 'My Submission', 'Team Details']

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="min-h-screen flex pt-20">
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Tabs bar */}
          <div className="bg-gray-100 rounded-md p-3 mb-4 flex justify-center">
            <div className="flex gap-2 relative">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`px-6 py-2 rounded-md font-medium transition relative`}
                >
                  {active === t && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-md shadow"
                      style={{ borderRadius: 20 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 text-[#4a4a4a]">{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              {active === 'Problem Statements' && (
                <motion.div
                  key="problem-statements"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  
                  {/* Put your Problem Statements content here */}
                  <div className="mt-4 p-4 bg-white rounded shadow">
                    <ProblemStatements />
                  </div>
                </motion.div>
              )}

              {active === 'My Submission' && (
                <motion.div
                  key="my-submission"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4">
                    <Student_submitions />
                  </div>
                </motion.div>
              )}

              {active === 'Team Details' && (
                <motion.div
                  key="team-details"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-4">
                    <TeamDetails />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentNav