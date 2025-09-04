import React from "react";

const Checkout = () => {
  return (
    <main className="mt-5">
      <div className="container">
        {/* Main Layout */}
        <main className="mb-6">
          <div className="container">
            {/* section cart */}
            <section className="">
              <div className="row gx-lg-5">
                <div className="col-lg-8 mb-4 mb-md-0">
                  <div className="alert alert-warning">
                    <strong>Review Your Shipping and Order Details</strong>
                  </div>
                  <div>
                    <h5 className="mb-4 mt-4">Contact Information</h5>
                    <div className="row mb-4">
                      <div className="col-lg-12">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Email
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Mobile
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="Mobile"
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="mb-4 mt-5">Shipping Information</h5>
                    <div className="row mb-4">
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            City
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            State
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Country
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4 mb-md-0">
                  {/* section summary */}
                  <section className="shadow-4 p-4 rounded-5 mb-4">
                    <h5 className="mb-5">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Sub Total</span>
                      <span>$88</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Tax Fee</span>
                      <span>$87</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Service Fee</span>
                      <span>$86</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping</span>
                      <span>$56</span>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between fw-bold mb-5">
                      <span>Total</span>
                      <span>$544</span>
                    </div>
                    <button type="button" className="btn btn-primary w-100">
                      Pay With Stripe
                      <i className="fas fa-credit-card ms-2"></i>
                    </button>
                  </section>
                  {/* end section summary */}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Checkout;
