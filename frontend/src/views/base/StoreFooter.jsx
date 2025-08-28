import React from "react";

const StoreFooter = () => {
  return (
    <footer className="bg-white text-dark pt-4 mt-5 shadow-sm">
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold text-primary">🛒 MyStore</h4>
            <p>
              Your one-stop shop for everything you love. Quality products,
              great deals, and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-dark text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-dark text-decoration-none">Contact</a></li>
              <li><a href="/shop" className="text-dark text-decoration-none">Shop</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-semibold">Follow Us</h5>
            <div>
              <a href="#" className="me-3 fs-4" style={{ color: "#1877F2" }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="me-3 fs-4" style={{ color: "#1DA1F2" }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="me-3 fs-4" style={{ color: "#E1306C" }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="fs-4" style={{ color: "#0A66C2" }}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center py-3 border-top border-secondary mt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} MyStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
