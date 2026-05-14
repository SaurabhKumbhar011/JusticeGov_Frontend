// import { useState } from 'react';

// // We replaced 'fileUri' with 'file: null'
// const EMPTY = { ownerId: '', role: 'CITIZEN', docType: 'ID_PROOF', file: null };

// export default function DocumentUpload({ onSubmit, status }) {
//   const [form, setForm] = useState(EMPTY);

//   // Standard text/number/select changes
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handle the physical file selection
//   const handleFileChange = (e) => setForm({ ...form, file: e.target.files[0] });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     // 🚀 CRITICAL FIX: Because your backend uses @RequestParam and MultipartFile,
//     // you MUST construct a FormData object here. Standard JSON will fail.
//     const formData = new FormData();
    
//     // Convert ownerId to a number. As you noted, this MUST be the Citizen ID or Lawyer ID!
//     formData.append("ownerId", Number(form.ownerId)); 
//     formData.append("role", form.role);
//     formData.append("docType", form.docType);
//     formData.append("file", form.file); // Append the actual file object

//     // Pass the formData object directly to the parent
//     onSubmit(formData); 
    
//     // Only reset if you want the form to clear immediately
//     // setForm(EMPTY); 
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label fw-semibold text-secondary small text-uppercase">
//             Profile ID (Citizen/Lawyer ID)
//           </label>
//           {/* Updated placeholder and label to remind the user not to use User ID */}
//           <input className="form-control" name="ownerId" type="number" placeholder="Enter Citizen ID or Lawyer ID"
//             value={form.ownerId} onChange={handleChange} required />
//           <div className="form-text" style={{fontSize: '11px'}}>Do NOT use the standard User ID.</div>
//         </div>
        
//         <div className="col-md-6">
//           <label className="form-label fw-semibold text-secondary small text-uppercase">Role</label>
//           <select className="form-select" name="role" value={form.role} onChange={handleChange}>
//             <option value="CITIZEN">Citizen</option>
//             <option value="LAWYER">Lawyer</option>
//           </select>
//         </div>
        
//         <div className="col-md-6">
//           <label className="form-label fw-semibold text-secondary small text-uppercase">Document Type</label>
//           <select className="form-select" name="docType" value={form.docType} onChange={handleChange}>
//             <option value="ID_PROOF">ID Proof</option>
//             <option value="BAR_CERTIFICATE">Bar Certificate</option>
//           </select>
//         </div>
        
//         <div className="col-md-6">
//           <label className="form-label fw-semibold text-secondary small text-uppercase">Upload File</label>
//           {/* Changed input type to "file" */}
//           <input className="form-control" name="file" type="file" accept="application/pdf, image/jpeg, image/png"
//             onChange={handleFileChange} required />
//         </div>
        
//         <div className="col-12 d-flex justify-content-end">
//           <button className="btn btn-primary px-5 fw-semibold" type="submit" disabled={status === 'loading'}>
//             {status === 'loading' ? 'Uploading...' : 'Upload Document'}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

import { useState } from 'react';

// ✅ NO ownerId here anymore
const EMPTY = {
  role: 'LAWYER',
  docType: 'BAR_CERTIFICATE',
  file: null,
};

export default function DocumentUpload({ onSubmit, status, profile }) {
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, file: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!profile?.id) {
      alert("Profile ID missing. Reload the page.");
      return;
    }

    const formData = new FormData();

    // ✅ REQUIRED fields (must match backend)
    formData.append("file", form.file);
    formData.append("ownerId", profile.id);              // ✅ FIXED
    formData.append("role", profile.role || 'LAWYER');   // ✅ FIXED
    formData.append("docType", form.docType);            // ✅ REQUIRED

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">

        {/* ✅ Removed ownerId input completely */}

        <div className="col-md-6">
          <label className="form-label fw-semibold small">Role</label>
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CITIZEN">Citizen</option>
            <option value="LAWYER">Lawyer</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold small">Document Type</label>
          <select
            className="form-select"
            name="docType"
            value={form.docType}
            onChange={handleChange}
          >
            <option value="ID_PROOF">ID Proof</option>
            <option value="BAR_CERTIFICATE">Bar Certificate</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label fw-semibold small">Upload File</label>
          <input
            className="form-control"
            type="file"
            accept="application/pdf, image/png, image/jpeg"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="col-12 text-end">
          <button
            className="btn btn-primary px-4"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </div>
    </form>
  );
}