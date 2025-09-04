import React from "react";
import { useAuthStore } from "../../store/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn, user, hydrateUser } = useAuthStore();

  

  return (
    <div className="container py-5">
      {isLoggedIn ? (
        <div className="card shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h3 className="card-title text-center text-primary mb-4">Dashboard</h3>
            <p><strong>Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div className="text-center mt-4">
              <Link to="/logout" className="btn btn-danger">
                Logout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="mb-4">Welcome to Home Page</h1>
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-success" to="/register">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
