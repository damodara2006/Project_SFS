import axios from "axios";
import React, { useState } from "react";
import {URL} from "../Utils";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PasswordStrength from "./PasswordStrength";
import Header from "./Header";

const RoleSelect = ({ value, onChange, error }) => (
  <div className="mb-4">
    <select
      name="role"
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
    name: "",
    date: new Date().toString().split(" ").slice(1, 4).join(" ")
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [email, setemail] = useState("")
  const [opt, setopt] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(false);



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
  }

  const handleemail = (e) => {
    e.preventDefault()
    console.log(e.target.value);
    setemail(e.target.value)

  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "password") {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      setIsPasswordValid(passwordRegex.test(value));
    }
  };

  const checkIfEmailAlreadyExist = async (email) => {
    // console.log(email);
    
    const data = await axios.post(`${URL}/checkifemailexist`, { email })
    .then(res=>(res.data)
    )

    return data
    
    
    // return data.then(res=>console.log(res)   )
   
  }

  // ✅ Simulate sending OTP
  const handleSendOtp = async() => {
    // console.log(email.trim().includes("@"));
    // console.log(await checkIfEmailAlreadyExist(email));
    
    if (await checkIfEmailAlreadyExist(email)) {
    
      if (email.trim().includes("@")) {
        // console.log(email);
      
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
      }
      else {
        toast.error("Enter valid email")
      }
    }
    else {
      toast.error("Email already exist")
    }
  // ✅ Verify OTP entered by user
  
   
  };

  const validate = (data) => {
    const fieldErrors = {};
    if (!data.emailVerified && !emailVerified)
      fieldErrors.email = "Email must be verified first";
    if (!data.role) fieldErrors.role = "Role is required";
    if (!data.password) fieldErrors.password = "Password is required";

    if (data.role === "spoc") {
      if (!data.name) fieldErrors.name = "SPOC Name is required";
      if (!data.college) fieldErrors.college = "College is required for SPOC";
      if (!data.collegeid)
        fieldErrors.collegeid = "College ID is required for SPOC";
    } else if (data.role === "evaluator") {
      if (!data.name) fieldErrors.name = "Evaluator Name is required";
      if (!data.college) fieldErrors.college = "Department is required for Evaluator";
      if (!data.collegeid) fieldErrors.collegeid = "ID is required for Evaluator";
    }

    return fieldErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    // console.log(form)
    const fieldErrors = validate(form);
    
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    
    }
       axios.post(`${URL}/register`, {
        email,
        password: form.password,
        role: form.role,
        college: form.college,
        college_code: form.collegeid,
        name: form.name,
        date: form.date
       }).then((res) => {
        console.log(res);
        
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
    <div className="min-h-screen flex items-center justify-center mt-10 p-4 fixed-bg">
      <Header />
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
            onChange={handleemail}
            placeholder="Enter Email"
            disabled={emailVerified}
            required
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
              className={`w-full p-3 border ${errors.otp ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                  {errors.password}
                </div>
              )}
              <PasswordStrength password={form.password} />
            </div>

            {(form.role === "spoc") && (
              <>
                <div className="mb-4">
                  <input
                   name="name"
                   type="text"
                   value={form.name}
                   onChange={onChange}
                   placeholder="SPOC Name"
                   className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
                   aria-invalid={!!errors.name}
                 />
                 {errors.name && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.name}
                    </div>
                  )}
                  <input
                    name="college"
                    type="text"
                    value={form.college}
                    onChange={onChange}
                    placeholder="SPOC College"
                    className={`w-full p-3 border ${errors.college ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a] mt-3`}
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
                    className={`w-full p-3 border ${errors.collegeid ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Evaluator Name"
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} mb-3 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <div className="mt-2 text-sm text-[#fc8f00]" role="alert">
                      {errors.name}
                    </div>
                  )}
                  <input
                    name="college"
                    type="text"
                    value={form.college}
                    onChange={onChange}
                    placeholder="Department"
                    className={`w-full p-3 border ${errors.college ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
                    placeholder="ID"
                    className={`w-full p-3 border ${errors.collegeid ? 'border-red-500' : 'border-gray-200'} rounded focus:outline-none focus:ring-2 focus:ring-[#fc8f00] text-[#4a4a4a]`}
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
            
            <button
              type="submit"
              disabled={!isPasswordValid}
              className="w-full p-3 rounded bg-[#fc8f00] hover:bg-[#e07a00] text-[#ffffff] font-semibold transition"
            >
              Register
            </button>
          </>
        )}
        <p>Already Registered?
            <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
            </p>
      </form>
      

    </div>
  );
};

export default Register;
