import React from "react";

const Contact = () => {
  const colors = {
    sidebarDark: "#001529ff",
    activeBlue: "#1890ff",
    backgroundLight: "#f0f2f5",
    govGold: "#cda45e"
  };

  return (
    <div style={{ backgroundColor: colors.backgroundLight, minHeight: "100vh" }}>
      
      {/* ✅ Hero Header - Removed extra padding bottom for better separation */}
      <section 
        className="py-5 text-white text-center" 
        style={{ 
            backgroundImage: `linear-gradient(rgba(0, 21, 41, 0.95), rgba(0, 21, 41, 0.85))`,
            backgroundColor: colors.sidebarDark,
            paddingTop: "140px", // Increased to account for your fixed navbar
            paddingBottom: "60px"
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Support <span style={{ color: colors.activeBlue }}>Center</span></h1>
          <p className="lead opacity-75">We are here to help you with the Digital Judiciary Portal</p>
        </div>
      </section>

      {/* ✅ Main Content - Removed negative marginTop to stop overlapping */}
      <div className="container py-5"> 
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* ✅ Main Support Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <div className="row g-0">
                
                {/* Left Side: Official Contact Details */}
                <div className="col-md-5 p-4 p-md-5 text-white" style={{ backgroundColor: colors.sidebarDark }}>
                  <h4 className="fw-bold mb-4" style={{ color: colors.govGold }}>Official Channels</h4>
                  
                  <div className="d-flex mb-4">
                    <i className="bi bi-geo-alt text-primary fs-4 me-3"></i>
                    <div>
                      <h6 className="mb-1 fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>Main Office</h6>
                      <p className="small mb-0 opacity-75">Dept. of Justice, Govt. of India<br/>Supreme Court Compound, New Delhi</p>
                    </div>
                  </div>

                  <div className="d-flex mb-4">
                    <i className="bi bi-telephone-outbound text-primary fs-4 me-3"></i>
                    <div>
                      <h6 className="mb-1 fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>Helpdesk Helpline</h6>
                      <p className="small mb-0 opacity-75">+91 11 2338 8942<br/>Toll Free: 1800-11-4567</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-top border-secondary opacity-50">
                    <small>Operating Hours: Mon - Fri, 9:00 AM - 5:30 PM</small>
                  </div>
                </div>

                {/* Right Side: Feedback & Email */}
                <div className="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
                  <h3 className="fw-bold mb-3" style={{ color: colors.sidebarDark }}>Complaints & Feedback</h3>
                  <p className="text-muted mb-4">
                    If you encounter any technical difficulties or wish to provide suggestions 
                    to improve our digital services, please send us a formal correspondence.
                  </p>

                  {/* Refined Email Box */}
                  <div className="p-3 rounded-3 d-flex align-items-center shadow-sm border" style={{ backgroundColor: "#f8fafc" }}>
                    <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                      <i className="bi bi-envelope-at-fill text-primary fs-4"></i>
                    </div>
                    <div>
                      <p className="text-secondary small mb-0 fw-bold text-uppercase">Email your query to:</p>
                      <a 
                        href="mailto:justicegov@justicegov.com" 
                        className="fw-bold fs-5 text-decoration-none"
                        style={{ color: colors.activeBlue }}
                      >
                        justicegov@justicegov.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="small text-muted mb-0">
                      <i className="bi bi-info-circle me-2"></i>
                      Please include your <strong>User ID</strong> or <strong>Case Reference Number</strong> in the subject line for faster resolution.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom FAQ Prompt */}
            <div className="text-center mt-5 mb-4">
                <p className="text-secondary">
                    Looking for immediate answers? <span className="text-primary fw-bold" style={{ cursor: 'pointer' }}>View Frequently Asked Questions</span>
                </p>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="py-5 mt-auto" style={{ backgroundColor: colors.sidebarDark, color: '#999' }}>
        <div className="container text-center">
          <div className="mb-4">
            <h5 className="text-white fw-bold mb-1">JusticeGov</h5>
            <p className="small">Department of Justice, Government of India</p>
          </div>
          <hr className="bg-secondary opacity-25" />
          <p className="mb-0 small pt-3">© {new Date().getFullYear()} JusticeGov. Website designed and hosted by NIC.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;