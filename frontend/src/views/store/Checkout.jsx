import React, { useEffect, useState } from "react";
import apiInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../utils/constants";

const Checkout = () => {
  const [order, setOrder] = useState([]);
  const param = useParams();
  const [couponCode, setCouponCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchOrderData = () => {
    apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const applyCoupon = async () => {
    const formdata = new FormData();
    formdata.append("order_oid", order.oid);
    formdata.append("coupon_code", couponCode);

    try {
      const response = await apiInstance.post("coupon/", formdata);
      fetchOrderData();
      Swal.fire({
        icon: response.data.icon,
        title: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const payWithStripe = (event) => {
    setPaymentLoading(true);
    event.target.form.submit();
  };

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
                            value={order.full_name}
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
                            value={order.email}
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
                            value={order.mobile}
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
                            value={order.address}
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
                            value={order.city}
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
                            value={order.state}
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
                            value={order.country}
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
                      <span>${order.sub_total}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Tax Fee</span>
                      <span>${order.tax_fee}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Service Fee</span>
                      <span>${order.service_fee}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping</span>
                      <span>${order.shipping_amount}</span>
                    </div>
                    {order.saved !== "0.00" && (
                      <div className="d-flex text-danger mt-3 fw-bold  justify-content-between">
                        <span>Discount</span>
                        <span>-${order.saved}</span>
                      </div>
                    )}

                    <hr className="my-4" />
                    <div className="d-flex justify-content-between fw-bold mb-5">
                      <span>Total</span>
                      <span>${order.total}</span>
                    </div>
                    {paymentLoading === true && (
                      <form
                        action={`${SERVER_URL}/api/v1/stripe-checkout/${order.oid}/`}
                      >
                        <button
                          onClick={payWithStripe}
                          disabled
                          type="button"
                          className="btn btn-primary w-100"
                        >
                          Processing...
                          <i className="fas fa-spinner fa-spin ms-2"></i>
                        </button>
                      </form>
                    )}
                    {paymentLoading === false && (
                      <form
                        action={`${SERVER_URL}/api/v1/stripe-checkout/${order.oid}/`} 
                        method="POST"
                      >
                        <button
                          onClick={payWithStripe}
                          type="button"
                          className="btn btn-primary w-100"
                        >
                          Pay With Stripe
                          <i className="fas fa-credit-card ms-2"></i>
                        </button>
                      </form>
                    )}
                  </section>
                  {/* end section summary */}
                  <section className="shadow card p-4 rounded-2 mb-4">
                    <h5>Apply Promo Code</h5>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Promo Code"
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        onClick={applyCoupon}
                        type="button"
                        className="btn btn-success ms-2"
                      >
                        Apply
                      </button>
                    </div>
                  </section>
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
