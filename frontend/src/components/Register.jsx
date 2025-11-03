// import React, { useState } from 'react'

// const RoleSelect = ({ value, onChange, error }) => {
//   return (
//     <div className="mb-4">
//       <select
//         name="role"
//         value={value}
//         onChange={onChange}
//         className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//         aria-invalid={!!error}
//       >
//         <option value="">Select role</option>
//         <option value="spoc">SPOC</option>
//         <option value="evaluator">Evaluator</option>
//       </select>
//       {error && (
//         <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//           {error}
//         </div>
//       )}
//     </div>
//   )
// }

// const Register = () => {
//   const [form, setForm] = useState({
//     email: '',
//     role: '',
//     password: '',
//     college: '',
//     collegeid: '',
//     dept: '',
//     id: '',
//   })
//   const [errors, setErrors] = useState({})

//   const onChange = (e) => {
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//     setErrors(prev => ({ ...prev, [name]: undefined }))
//   }

//   const validate = (data) => {
//     const fieldErrors = {}
//     if (!data.email) fieldErrors.email = 'Email is required'
//     else if (!/.+@.+\..+/.test(data.email)) fieldErrors.email = 'Please enter a valid email address'

//     if (!data.role) fieldErrors.role = 'Role is required'
//     if (!data.password) fieldErrors.password = 'Password is required'

//     if (data.role === 'spoc') {
//       if (!data.college) fieldErrors.college = 'College is required for SPOC'
//       if (!data.collegeid) fieldErrors.collegeid = 'College ID is required for SPOC'
//     } else if (data.role === 'evaluator') {
//       if (!data.dept) fieldErrors.dept = 'Department is required for Evaluator'
//       if (!data.id) fieldErrors.id = 'ID is required for Evaluator'
//     }

//     return fieldErrors
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
//     const fieldErrors = validate(form)
//     if (Object.keys(fieldErrors).length > 0) {
//       setErrors(fieldErrors)
//       return
//     }

//     setErrors({})
//     // form is valid — proceed with submit (fetch / API call)
//     console.log('Validated data:', form)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#4a4a4a] p-4">
//       <form
//         onSubmit={onSubmit}
//         className="w-full max-w-[420px] bg-[#ffffff] rounded-lg shadow-lg p-6"
//         aria-label="Register form"
//       >
//         <h1 className="text-2xl font-bold mb-4 text-[#4a4a4a]">Register</h1>

//         {/* Role select moved to the top and extracted for reuse */}
//         <RoleSelect value={form.role} onChange={onChange} error={errors.role} />

//         <div className="mb-4">
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={onChange}
//             placeholder="Email"
//             className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//             aria-invalid={!!errors.email}
//           />
//           {errors.email && (
//             <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//               {errors.email}
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={onChange}
//             placeholder="Password"
//             className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//             aria-invalid={!!errors.password}
//           />
//           {errors.password && (
//             <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//               {errors.password}
//             </div>
//           )}
//         </div>

//         {form.role === 'spoc' && (
//           <>
//             <div className="mb-4">
//               <input
//                 name="college"
//                 type="text"
//                 value={form.college}
//                 onChange={onChange}
//                 placeholder="College"
//                 className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//                 aria-invalid={!!errors.college}
//               />
//               {errors.college && (
//                 <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//                   {errors.college}
//                 </div>
//               )}
//             </div>

//             <div className="mb-6">
//               <input
//                 name="collegeid"
//                 type="text"
//                 value={form.collegeid}
//                 onChange={onChange}
//                 placeholder="College ID"
//                 className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//                 aria-invalid={!!errors.collegeid}
//               />
//               {errors.collegeid && (
//                 <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//                   {errors.collegeid}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {form.role === 'evaluator' && (
//           <>
//             <div className="mb-4">
//               <input
//                 name="dept"
//                 type="text"
//                 value={form.dept}
//                 onChange={onChange}
//                 placeholder="Department"
//                 className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//                 aria-invalid={!!errors.dept}
//               />
//               {errors.dept && (
//                 <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//                   {errors.dept}
//                 </div>
//               )}
//             </div>

//             <div className="mb-6">
//               <input
//                 name="id"
//                 type="text"
//                 value={form.id}
//                 onChange={onChange}
//                 placeholder="ID"
//                 className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
//                 aria-invalid={!!errors.id}
//               />
//               {errors.id && (
//                 <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
//                   {errors.id}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           className="w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-[#ffffff] font-semibold transition"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Register
import React, { useState } from "react";

const RoleSelect = ({ value, onChange, error }) => (
  <div className="mb-4">
    <select
      name="role"
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
      aria-invalid={!!error}
    >
      <option value="">Select role</option>
      <option value="spoc">SPOC</option>
      <option value="evaluator">Evaluator</option>
    </select>
    {error && (
      <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
        {error}
      </div>
    )}
  </div>
);

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    role: "",
    password: "",
    college: "",
    collegeid: "",
    dept: "",
    id: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ✅ Simulate sending OTP
  const handleSendOtp = () => {
    if (!form.email) {
      setErrors({ email: "Please enter your email" });
      return;
    } else if (!/.+@.+\..+/.test(form.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`OTP sent to ${form.email}: ${otp}`); // For demo only
  };

  // ✅ Verify OTP entered by user
  const handleVerifyOtp = () => {
    if (form.otp === generatedOtp) {
      setEmailVerified(true);
      setOtpSent(false);
      alert("Email verified successfully!");
    } else {
      setErrors({ otp: "Invalid OTP. Please try again." });
    }
  };

  const validate = (data) => {
    const fieldErrors = {};
    if (!data.emailVerified && !emailVerified)
      fieldErrors.email = "Email must be verified first";
    if (!data.role) fieldErrors.role = "Role is required";
    if (!data.password) fieldErrors.password = "Password is required";

    if (data.role === "spoc") {
      if (!data.college) fieldErrors.college = "College is required for SPOC";
      if (!data.collegeid)
        fieldErrors.collegeid = "College ID is required for SPOC";
    } else if (data.role === "evaluator") {
      if (!data.dept) fieldErrors.dept = "Department is required for Evaluator";
      if (!data.id) fieldErrors.id = "ID is required for Evaluator";
    }

    return fieldErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    console.log("Validated data:", form);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[420px] bg-[#ffffff] rounded-lg shadow-lg p-6"
        aria-label="Register form"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#4a4a4a]">Register</h1>

        {/* Email Field */}
        <div className="mb-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            disabled={emailVerified}
            className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
              {errors.email}
            </div>
          )}
        </div>

        {/* Verify Email Button */}
        {!otpSent && !emailVerified && (
          <button
            type="button"
            onClick={handleSendOtp}
            className="mb-4 w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-white font-semibold transition"
          >
            Verify Email
          </button>
        )}

        {/* OTP Field */}
        {otpSent && (
          <div className="mb-4">
            <input
              name="otp"
              type="text"
              value={form.otp}
              onChange={onChange}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
              aria-invalid={!!errors.otp}
            />
            {errors.otp && (
              <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                {errors.otp}
              </div>
            )}
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="mt-3 w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-white font-semibold transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Remaining fields only after verification */}
        {emailVerified && (
          <>
            <RoleSelect
              value={form.role}
              onChange={onChange}
              error={errors.role}
            />

            <div className="mb-4">
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

            {form.role === "spoc" && (
              <>
                <div className="mb-4">
                  <input
                    name="college"
                    type="text"
                    value={form.college}
                    onChange={onChange}
                    placeholder="College"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
                    aria-invalid={!!errors.college}
                  />
                  {errors.college && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.college}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    name="collegeid"
                    type="text"
                    value={form.collegeid}
                    onChange={onChange}
                    placeholder="College ID"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
                    aria-invalid={!!errors.collegeid}
                  />
                  {errors.collegeid && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.collegeid}
                    </div>
                  )}
                </div>
              </>
            )}

            {form.role === "evaluator" && (
              <>
                <div className="mb-4">
                  <input
                    name="dept"
                    type="text"
                    value={form.dept}
                    onChange={onChange}
                    placeholder="Department"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
                    aria-invalid={!!errors.dept}
                  />
                  {errors.dept && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.dept}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <input
                    name="id"
                    type="text"
                    value={form.id}
                    onChange={onChange}
                    placeholder="ID"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]"
                    aria-invalid={!!errors.id}
                  />
                  {errors.id && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.id}
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-[#ffffff] font-semibold transition"
            >
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
