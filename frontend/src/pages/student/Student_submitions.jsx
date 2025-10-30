import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Samplepdf from "../../assets/sample.pdf"
function Student_submitions() {
  return (
      <div className=' min-h-screen flex flex-col font-semibold '>
          <Header />
              <div className='flex-grow flex items-center w-full justify-center'>
          <div className='flex items-center w-full justify-center'>
              <div className='mt-30 w-[80%] flex flex-col gap-10 mb-40'>
                  <span className='flex w-full '><label htmlFor="id" className='min-w-[30%] text-center'>Problem id</label> <p className='w-[10%]'>:</p>
                      <p id='id'>P001</p></span>
                  <span className='flex w-full '><label htmlFor="id" className='min-w-[30%] text-center'>Title</label> <p className='w-[10%] '>:</p>
                      <p id='id'>Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Rural Northeast India</p></span>
                  <span className='flex w-full '><label htmlFor="id" className='min-w-[30%] text-center'>Submitted Status</label><p className='w-[10%]'>:</p>
                      <p className='text-green-500 font-bold'>Submitted</p></span>
                  
                  <span className='flex w-full '><label htmlFor="id" className='min-w-[30%] text-center'>Approval Status</label><p className='w-[10%]'>:</p>
                      <p id='id' className='text-yellow-400 font-bold'>Pending</p></span>
                  <span className='flex w-full  min-h-96'><label htmlFor="id" className='min-w-[30%] text-center'>Submitted Solution</label><p className='w-[10%]'>:</p>
                      <object data={Samplepdf} type="" ></object></span>
                  </div>
              </div>
          </div>
        <Footer/>
    </div>
  )
}

export default Student_submitions
