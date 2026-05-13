// import React, { useState } from 'react';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         role: 'CITIZEN' 
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({ 
//             ...formData, 
//             [e.target.name]: e.target.value 
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setMessage('');
        
//         try {
//             // Replace this with your actual authService.register(formData) call
//             // await register(formData);
            
//             setTimeout(() => {
//                 setMessage('Registration successful! Awaiting admin approval.');
//                 setIsLoading(false);
//                 setFormData({ name: '', email: '', phone: '', password: '', role: 'CITIZEN' }); 
//             }, 1500);
//         } catch (err) {
//             setMessage(err.response?.data?.message || 'Registration failed. Please check your inputs.');
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center py-5">
//             <div className="card shadow-lg p-4 bg-dark text-light" style={{ width: '100%', maxWidth: '500px', borderColor: '#333' }}>
                
//                 <div className="text-center mb-4">
//                     <h2 className="fw-bold mb-1">JusticeGov Portal</h2>
//                     <p className="text-secondary">Create your secure IAM account</p>
//                 </div>
                
//                 {message && (
//                     <div className={`alert ${message.includes('successful') ? 'alert-success text-success bg-success bg-opacity-10 border-success' : 'alert-danger text-danger bg-danger bg-opacity-10 border-danger'} py-2`} role="alert">
//                         {message}
//                     </div>
//                 )}
                
//                 <form id="form_1" onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label className="form-label text-light">Full Name</label>
//                         <input 
//                             type="text" 
//                             name="name" 
//                             value={formData.name} 
//                             onChange={handleChange} 
//                             className="form-control bg-dark text-light border-secondary"
//                             placeholder="Enter your legal name"
//                             required 
//                         />
//                     </div>
                    
//                     <div className="mb-3">
//                         <label className="form-label text-light">Email Address</label>
//                         <input 
//                             type="email" 
//                             name="email" 
//                             value={formData.email} 
//                             onChange={handleChange} 
//                             className="form-control bg-dark text-light border-secondary"
//                             placeholder="name@justicegov.com"
//                             required 
//                         />
//                     </div>
                    
//                     <div className="mb-3">
//                         <label className="form-label text-light">Phone Number</label>
//                         <input 
//                             type="tel" 
//                             name="phone" 
//                             value={formData.phone} 
//                             onChange={handleChange} 
//                             className="form-control bg-dark text-light border-secondary"
//                             placeholder="+91 00000 00000"
//                             required 
//                         />
//                     </div>
                    
//                     <div className="mb-3">
//                         <label className="form-label text-light">Password</label>
//                         <input 
//                             type="password" 
//                             name="password" 
//                             value={formData.password} 
//                             onChange={handleChange} 
//                             className="form-control bg-dark text-light border-secondary"
//                             placeholder="••••••••"
//                             required 
//                         />
//                     </div>
                    
//                     <div className="mb-4">
//                         <label className="form-label text-light">Requested Role</label>
//                         <select 
//                             name="role" 
//                             value={formData.role} 
//                             onChange={handleChange}
//                             className="form-select bg-dark text-light border-secondary"
//                         >
//                             <option value="CITIZEN">Citizen</option>
//                             <option value="LAWYER">Lawyer</option>
//                             <option value="JUDGE">Judge</option>
//                             <option value="CLERK">Court Clerk</option>
//                             <option value="REGISTRAR">Registrar</option>
//                             <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
//                             <option value="AUDITOR">Auditor</option>
//                             <option value="RESEARCHER">Researcher</option>
//                             <option value="ADMIN">System Administrator</option>
//                         </select>
//                     </div>

//                     <button 
//                         id="m_send" 
//                         type="submit" 
//                         className="btn btn-primary w-100 py-2 fw-semibold" 
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <span>
//                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                 Processing...
//                             </span>
//                         ) : 'Register Account'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from "react";
import { register } from "../../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CITIZEN",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      });

      setMessage("Registration successful! Awaiting admin approval.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "CITIZEN",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please check your inputs."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 p-5"
        style={{
          backgroundColor: "#1e293b",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="fw-bold text-white mb-1">JusticeGov</h1>
          <p className="text-secondary small text-uppercase fw-bold">
            Identity & Access Portal
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("successful")
                ? "alert-success bg-success bg-opacity-10 text-success border-0"
                : "alert-danger bg-danger bg-opacity-10 text-danger border-0"
            } small py-2`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control bg-dark text-white border-0 py-2 shadow-none"
              style={{ borderRadius: "8px" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control bg-dark text-white border-0 py-2 shadow-none"
              style={{ borderRadius: "8px" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control bg-dark text-white border-0 py-2 shadow-none"
              style={{ borderRadius: "8px" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control bg-dark text-white border-0 py-2 shadow-none"
              style={{ borderRadius: "8px" }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">
              Requested Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select bg-dark text-white border-0 py-2 shadow-none"
              style={{ borderRadius: "8px" }}
            >
              <option value="CITIZEN">Citizen</option>
              <option value="LAWYER">Lawyer</option>
              <option value="JUDGE">Judge</option>
              <option value="CLERK">Court Clerk</option>
              <option value="REGISTRAR">Registrar</option>
              <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
              <option value="AUDITOR">Auditor</option>
              <option value="RESEARCHER">Researcher</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold py-2 shadow"
            style={{
              backgroundColor: "#38bdf8",
              border: "none",
              color: "#000",
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Processing...
              </span>
            ) : (
              "Register Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;