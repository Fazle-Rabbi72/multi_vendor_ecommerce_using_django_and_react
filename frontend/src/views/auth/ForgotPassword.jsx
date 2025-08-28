import React from "react";
import { useState } from "react";
import apiInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiInstance.get(`user/password-reset/${email}`).then((res) => {
        alert("An email has been sent to you");
        console.log(res);
      });
    } catch (error) {
      alert("Email not found");
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">
          Forgot Password
        </h3>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Email <i className="fas fa-paper-plane"></i>
            </>
          )}
        </button>

        <p className="text-center mt-3">
          <a href="/login" className="text-decoration-none text-secondary">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
