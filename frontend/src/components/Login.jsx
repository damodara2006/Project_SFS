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
            
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Login