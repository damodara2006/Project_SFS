import axios from "axios";
import React, { useState } from "react";
import URL from "../Utils";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
    otp:"",
    role: "",
    password: "",
    college: "",
    collegeid: "",
    dept: "",
    id: "",
    name:""
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [email, setemail] = useState("")
  const [opt, setopt] = useState("")


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ✅ Simulate sending OTP
  const handleSendOtp = () => {
    const lodaing = toast.loading("Sending OTP")

    console.log(email)
    if (email) { 
      axios.post(`${URL}/verify_email/${email}`)
        .then(res => {
          if (res.status == 200) {
            
            toast.dismiss(lodaing)
            toast.success("OTP Sent")
            setGeneratedOtp(res.data), console.log(res), setopt(res.data)
            setOtpSent(true);

          }
         });

    }

    setOtpSent(true);
    // alert(`OTP sent to ${email}`); // For demo only
  };

  // ✅ Verify OTP entered by user
  const handleVerifyOtp = () => {
    // const lodaing = toast.loading("Sending OTP")
    console.log(generatedOtp, "ffg", form.otp, opt)
    if (opt == form.otp) {
      setEmailVerified(true);
      setOtpSent(false);
      // toast.dismiss(lodaing)
      toast.success("verified successfully!")
      // alert("Email verified successfully!");
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
    // console.log(form)
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    
    }

   
       axios.post(
        `${URL}/register/${email}/${form.password}/${form.role}/${form.college}/${form.collegeid}/${form.name}`
       ).then((res) => {
        
         if (res.status === 200) {
           toast.success("Registered!", { style: { backgroundColor: "green" } });
           setTimeout(() => {
             navigate("/login");
           }, 2000);
         } else {
           toast.error("Error creating", { style: { backgroundColor: "red" } });
         }
      })


    

  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 p-4">
      <Toaster position="top-right"/> 
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
            value={email}
            onChange={(e)=>setemail(e.target.value)}
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
                   name="name"
                   type="text"
                   value={form.name}
                   onChange={onChange}
                   placeholder="SPOC Name"
                   className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a] "
                   aria-invalid={!!errors.name}
                 />
                  <input
                    name="college"
                    type="text"
                    value={form.college}
                    onChange={onChange}
                    placeholder="College"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a] mt-3"
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
