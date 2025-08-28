import React from "react";

const StoreHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="#">
          <i className="fa-solid fa-store me-2"></i> MyStore
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Services
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>

          {/* 🔍 Stylish Search bar */}
          <form className="d-flex mx-auto w-50" role="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-start-pill"
                placeholder="Search products..."
                aria-label="Search"
              />
              <button
                className="btn btn-warning rounded-end-pill"
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <a href="#" className="btn btn-outline-light position-relative">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </a>

            {/* Profile */}
            <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-user-circle fa-lg me-2"></i> Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    My Account
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Orders
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoreHeader;
