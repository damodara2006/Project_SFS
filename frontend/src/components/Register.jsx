import React, { useState } from 'react'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach(err => {
        const key = err.path[0] || '_'
        fieldErrors[key] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    // form is valid — proceed with submit (fetch / API call)
    console.log('Validated data:', result.data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a4a4a] p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[420px] bg-[#ffffff] rounded-lg shadow-lg p-6"
        aria-label="Register form"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#4a4a4a]">Register</h1>

        <div className="mb-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
              {errors.email}
            </div>
          )}
        </div>

        <div className="mb-6">
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
              {errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-[#ffffff] font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
