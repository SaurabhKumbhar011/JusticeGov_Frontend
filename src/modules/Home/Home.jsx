import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const colors = {
    sidebarDark: "#001529",
    activeBlue: "#1890ff",
    backgroundLight: "#f0f2f5",
    textGray: "#4d4d4d",
    govGold: "#cda45e"
  };

  return (
    <div style={{ backgroundColor: colors.backgroundLight, minHeight: "100vh", overflowX: "hidden" }}>
      {/* ✅ Official Header Strip */}
      <div className="py-1 px-4 text-white d-none d-md-block" style={{ backgroundColor: "#000", fontSize: "12px opacity 0.8" }}>
        <small>GOVERNMENT OF INDIA • SUPREME COURT DIGITAL INITIATIVE</small>
      </div>

      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 shadow-sm sticky-top" style={{ backgroundColor: colors.sidebarDark }}>
        <div className="container-fluid">
          <span className="navbar-brand fw-bold d-flex align-items-center">
             <i className="bi bi-bank2 me-2 text-primary"></i>
             <span style={{ letterSpacing: "1px", fontSize: "1.5rem" }}>JusticeGov</span>
          </span>

          <div className="ms-auto d-flex align-items-center">
            <button className="btn btn-link text-light text-decoration-none me-3 d-none d-sm-inline" onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="btn px-4 fw-bold shadow-sm text-white"
              style={{ backgroundColor: colors.activeBlue, border: 'none' }}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section - Fixed Image Path */}
      <section
        className="d-flex align-items-center text-white text-center text-md-start"
        style={{
          minHeight: "80vh",
          position: "relative",
          // Using a high-resolution, more reliable legal background
          backgroundImage: `linear-gradient(rgba(0, 21, 41, 0.85), rgba(0, 21, 41, 0.7)), url('https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h6 className="text-uppercase mb-3" style={{ color: colors.govGold, letterSpacing: "2px" }}>
                National e-Courts Mission Mode Project
              </h6>
              <h1 className="display-3 fw-bold mb-3" style={{ lineHeight: "1.1" }}>
                Digital <span style={{ color: colors.activeBlue }}>Judiciary</span> Portal
              </h1>
              <p className="lead fs-4 mb-5 opacity-75">
                The integrated mission mode project for the Indian Judiciary. Providing a paperless, 
                transparent, and accessible legal ecosystem for all citizens.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
                <button
                  className="btn btn-lg px-5 py-3 fw-bold shadow text-white"
                  style={{ backgroundColor: colors.activeBlue, border: 'none' }}
                  onClick={() => navigate("/login")}
                >
                  Access Dashboard
                </button>
                <div className="d-flex align-items-center justify-content-center text-light opacity-75">
                  <i className="bi bi-shield-check me-2 fs-4"></i>
                  <span>Secure 256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Informative Cards - No Links */}
      <section className="py-5 px-3 px-md-0" style={{ marginTop: "-100px" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4 col-sm-6">
              <div className="card h-100 border-0 shadow-lg p-4 text-center rounded-4">
                <div className="card-body">
                  <div className="rounded-circle d-inline-flex p-3 mb-3 shadow-sm" style={{ backgroundColor: '#e6f7ff', color: colors.activeBlue }}>
                    <i className="bi bi-journal-text fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.sidebarDark }}>Judicial Directives</h5>
                  <p className="text-muted small mb-0">
                    Orders and judgments are digitally signed by presiding officers, ensuring authenticity and preventing tampering of court records.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 col-sm-6">
              <div className="card h-100 border-0 shadow-lg p-4 text-center rounded-4">
                <div className="card-body">
                  <div className="rounded-circle d-inline-flex p-3 mb-3 shadow-sm" style={{ backgroundColor: '#fff7e6', color: '#faad14' }}>
                    <i className="bi bi-people-fill fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.sidebarDark }}>Litigant Awareness</h5>
                  <p className="text-muted small mb-0">
                    Empowering citizens with real-time access to case history, upcoming hearing dates, and court proceedings from any location.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 col-sm-12">
              <div className="card h-100 border-0 shadow-lg p-4 text-center rounded-4">
                <div className="card-body">
                  <div className="rounded-circle d-inline-flex p-3 mb-3 shadow-sm" style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
                    <i className="bi bi-globe fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: colors.sidebarDark }}>Digital Inclusion</h5>
                  <p className="text-muted small mb-0">
                    Reducing the geographical barriers to justice through e-filing and virtual hearings, promoting a swifter disposal of cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Government Info Section */}
      <section className="py-5 mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-4" style={{ color: colors.sidebarDark }}>Information Desk</h2>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>The e-Courts project is a strategic initiative under the National e-Governance Plan (NeGP).</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>Interoperable Criminal Justice System (ICJS) integration for seamless data transfer.</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>Adherence to the Information Technology Act, 2000 for all digital judicial records.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 bg-white p-4 rounded-4 shadow-sm border-start border-4" style={{ borderColor: colors.activeBlue }}>
               <h6 className="fw-bold text-primary text-uppercase mb-2">Legal Notice</h6>
               <p className="small text-muted mb-0">
                 This portal is intended for authorized judicial personnel, legal practitioners, and registered litigants. 
                 Any unauthorized attempt to access or modify judicial data is a punishable offense under the 
                 Cyber Laws of India.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
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

      {/* Responsive Styles */}
      <style>{`
        .card { transition: all 0.3s ease; }
        .card:hover { transform: scale(1.02); }
        h1 { font-size: calc(1.8rem + 2vw); }
        @media (max-width: 768px) {
          section { min-height: 60vh !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;