import React from 'react'
const Login = () => {
  return (
    <div>
        <form action="">
            <label htmlFor="Role">Select Your Role</label>

            <select name="role" id="role">
                <option value="Admin">Admin - SACL</option>
                <option value="Evaluator">Evaluator - SACL</option>
                <option value="spoc">SPOC</option>
                <option value="student">Student</option>
            </select>

            <br />

            <label htmlFor="Email">Email</label>
            <input type="email" />

            <br />

            <label htmlFor="password">Password</label>
            <input type="password" />

            <br />

            <a href="" className='text-blue-600'>Forgot Your Password?</a>

            <br />

            <button className='bg-amber-500 p-2 rounded-2xl font-bold text-white'>Submit</button>
        </form>
    </div>
  )
}

export default Login