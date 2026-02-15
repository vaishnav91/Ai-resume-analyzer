import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      backgroundColor: "#111",
      color: "#fff"
    }}>
      <h2>AI Resume Analyzer</h2>
      <div>
        <Link to="/dashboard" style={{ color: "#fff", marginRight: "20px" }}>
          Dashboard
        </Link>
        <Link to="/admin" style={{ color: "#fff" }}>
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
