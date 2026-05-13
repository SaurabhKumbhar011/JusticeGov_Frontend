import React from "react";

const About = () => {
  const colors = {
    sidebarDark: "#001529ff",
    activeBlue: "#1890ff",
    backgroundLight: "#f0f2f5",
    govGold: "#cda45e"
  };

  return (
    <div style={{ backgroundColor: colors.backgroundLight, minHeight: "100vh" }}>
      
      {/* ✅ Hero Header (Synced with Home) */}
      <section 
        className="py-5 text-white text-center text-md-start" 
        style={{ 
            backgroundImage: `linear-gradient(rgba(0, 21, 41, 0.95), rgba(0, 21, 41, 0.85))`,
            backgroundColor: colors.sidebarDark,
            paddingTop: "120px !important" 
        }}
      >
        <div className="container py-4">
          <h6 className="text-uppercase mb-3" style={{ color: colors.govGold, letterSpacing: "2px" }}>
            Institutional Profile
          </h6>
          <h1 className="display-4 fw-bold">About <span style={{ color: colors.activeBlue }}>JusticeGov</span></h1>
          <p className="lead opacity-75 max-width-700">Revolutionizing the Indian Legal Ecosystem through Digital Transformation.</p>
        </div>
      </section>

      {/* ✅ Content Section */}
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-7">
            <h2 className="fw-bold mb-4" style={{ color: colors.sidebarDark }}>Our Mission</h2>
            <p className="text-muted fs-5">
              JusticeGov is a flagship initiative designed to streamline judicial processes, 
              ensuring that justice is accessible to every citizen 
              through a transparent, paperless, and efficient digital platform.
            </p>
            <p className="text-muted mb-4">
              By integrating advanced encryption and real-time tracking, we provide legal 
              professionals and litigants with a secure environment to manage case filings 
              and monitor compliance directives.
            </p>
            
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-4 border-0 rounded-4 bg-white shadow-sm hover-up">
                  <i className="bi bi-eye-fill text-primary fs-3 mb-2 d-block"></i>
                  <h6 className="fw-bold mb-1">Transparency</h6>
                  <small className="text-muted">Public access to daily cause lists and digitally signed orders.</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 border-0 rounded-4 bg-white shadow-sm hover-up">
                  <i className="bi bi-universal-access text-warning fs-3 mb-2 d-block"></i>
                  <h6 className="fw-bold mb-1">Accessibility</h6>
                  <small className="text-muted">Breaking geographical barriers with virtual filings and hearings.</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4" style={{ backgroundColor: colors.sidebarDark }}>
              <div className="card-body">
                <h4 className="fw-bold mb-4" style={{ color: colors.govGold }}>Key Objectives</h4>
                <ul className="list-unstyled text-white opacity-75 mb-0">
                  <li className="mb-3 d-flex align-items-center border-bottom border-secondary pb-3">
                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                    <span>Implementation of e-Filing systems</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center border-bottom border-secondary pb-3">
                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                    <span>Real-time Compliance Monitoring</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center border-bottom border-secondary pb-3">
                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                    <span>National Judicial Data Grid Integration</span>
                  </li>
                  <li className="mb-0 d-flex align-items-center">
                    <i className="bi bi-check2-circle text-primary me-3 fs-5"></i> 
                    <span>Citizen-centric Legal Services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer (Synced with Home) */}
      <footer className="py-5 mt-5" style={{ backgroundColor: colors.sidebarDark, color: '#999' }}>
        <div className="container text-center">
          <div className="mb-4">
            <h5 className="text-white fw-bold mb-1">JusticeGov</h5>
            <p className="small">Department of Justice, Government of India</p>
          </div>
          <hr className="bg-secondary opacity-25" />
          <p className="mb-0 small pt-3">© {new Date().getFullYear()} JusticeGov. Website designed and hosted by National Informatics Centre (NIC).</p>
        </div>
      </footer>

      <style>{`
        .hover-up { transition: all 0.3s ease; }
        .hover-up:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

export default About;