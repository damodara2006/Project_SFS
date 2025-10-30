import React from 'react'

const StudentNav = () => {
  return (
    <div>
        <div className='min-h-screen flex flex-col items-left justify-center gap-10'>        
            <div className='flex flex-col gap-5'>
                <div className='bg-white border shadow-lg w-44 p-2 rounded-2xl hover:bg-[#ff9100] hover:text-white'><h1 className='font-bold text-center'>Problem Statement</h1></div>
                <div className='bg-white border shadow-lg w-44 p-2 rounded-2xl hover:bg-[#ff9100] hover:text-white'><h1 className='font-bold text-center'>View Submission</h1></div>
                <div className='bg-white border shadow-lg w-44 p-2 rounded-2xl hover:bg-[#ff9100] hover:text-white'><h1 className='font-bold text-center'>Team Details</h1></div>
            </div>
        </div>

    </div>
  )
}

export default StudentNav