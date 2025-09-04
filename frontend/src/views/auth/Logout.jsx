import { useEffect } from "react";
import { logout } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear token/session
    window.location.href = "/";
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "400px" }}>
        <h3 className="text-primary mb-4">You have been logged out</h3>

        <p className="mb-3">Want to login again or create a new account?</p>

        <div className="d-flex justify-content-center gap-3">
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
          <Link className="btn btn-success" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
