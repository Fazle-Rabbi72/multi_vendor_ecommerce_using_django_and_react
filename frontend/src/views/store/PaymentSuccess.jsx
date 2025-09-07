import React, { useEffect } from "react";
import apiInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [order, setOrder] = React.useState([]);
  const [status, setStatus] = React.useState("Verifying");
  const param = useParams();
  const urlParam = new URLSearchParams(window.location.search);
  const sessionId = urlParam.get("session_id");

  useEffect(() => {
    apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  }, [param]);

  useEffect(() => {
    
    const formdata = new FormData();
    formdata.append("order_oid", param?.order_oid);
    formdata.append("session_id", sessionId);

    apiInstance.post(`payment-success/${order.oid}/`, formdata).then((res) => {
      setStatus(res.data.message);
    });
  }, [param?.order_oid]);

  console.log(status);

  return (
    <main className="mb-4 mt-4 h-100">
      <div className="container">
        <section className="">
          <div className="gx-lg-5">
            <div className="row">
              <div className="col-xl-12">
                <div className="application_statics">
                  <div className="account_user_deails dashboard_page">
                    <div className="d-flex justify-content-center align-items-center">
                      {status === "Verifying" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success"></div>
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fa fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              ></i>
                            </div>
                            <div className="text-center">
                              <h1>
                                Payment Verifying{" "}
                                <i className="fa fa-spinner fa-spin"></i>
                              </h1>
                              <p>
                                <b className="text-success">
                                  Please wait while we verify your payment
                                </b>
                                <br />
                                <b className="text-danger">
                                  NOTE: Do not refresh the page
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "Payment Successfull" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success"></div>
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fa fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              ></i>
                            </div>
                            <div className="text-center">
                              <h1> Thank You !</h1>
                              <p>
                                Thanks for your patronage, please note order id{" "}
                                <b>#{order.oid}</b> <br />
                                We have sent an order summary to your email
                                address <b>({order.email})</b>
                              </p>
                              <button
                                className="btn btn-success mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                View Order <i className="fas fa-eye"></i>
                              </button>
                              <a
                                href="{% url 'dashboard:invoice' order.oid %}"
                                className="btn btn-primary mt-3 ms-2"
                              >
                                Download Invoice{" "}
                                <i className="fas fa-file-invoice"></i>
                              </a>
                              <a
                                href="{ % url 'dashboard:dashboard} %"
                                className="btn btn-secondary ms-2 mt-3"
                              >
                                Back to Home <i className="fas fa-home"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "Already Paid" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success"></div>
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fa fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              ></i>
                            </div>
                            <div className="text-center">
                              <h1> Already Paid !</h1>
                              <p>
                                Thanks for your patronage, please note order id{" "}
                                <b>#{order.oid}</b> <br />
                                We have sent an order summary to your email
                                address <b>({order.email})</b>
                              </p>
                              <button
                                className="btn btn-success mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                View Order <i className="fas fa-eye"></i>
                              </button>
                              <a
                                href="{% url 'dashboard:invoice' order.oid %}"
                                className="btn btn-primary mt-3 ms-2"
                              >
                                Download Invoice{" "}
                                <i className="fas fa-file-invoice"></i>
                              </a>
                              <a
                                href="{ % url 'dashboard:dashboard} %"
                                className="btn btn-secondary ms-2 mt-3"
                              >
                                Back to Home <i className="fas fa-home"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "Your Invoice is Unpaid" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success"></div>
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fa fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              ></i>
                            </div>
                            <div className="text-center">
                              <h1>
                                Unpaid Invoice <i className="fas fa-ban"></i>
                              </h1>
                              <p>
                                <b className="text-danger">
                                  Please try making the payment again
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Order Summary
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body text-start text-black p-4">
                <h5
                  className="modal-title text-uppercase"
                  id="exampleModalLabel"
                >
                  {order.full_name}
                </h5>
                <h6>{order.email}</h6>
                <h6>{order.mobile}</h6>
                <br />
                <h6 className="mb-5">
                  {order.address}-{order.city} <br />
                  {order.state}-{order.country}
                </h6>
                <p className="mb-0" style={{ color: " #35558a" }}>
                  Payment Summary
                </p>
                <hr
                  className="mt-2 mb-4"
                  style={{
                    height: 0,
                    backgroundColor: "transparent",
                    opacity: ".75",
                    borderTop: "2px dashed #35558a",
                  }}
                />
                {order.orderitem?.map((o, index) => (
                  <div
                    className="d-flex justify-content-between shadow p-2 rounded-2 mb-2"
                    key={index}
                  >
                    <p className="fa-bold mb-0">{o.product?.title}</p>
                    <p className="fa-bold mb-0">${o.price}</p>
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Sub Total</p>
                  <p className="small mb-0">${order.sub_total}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Shipping Fee</p>
                  <p className="small mb-0">${order.shipping_amount}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Tax Fee</p>
                  <p className="small mb-0">${order.tax_fee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small">Service Fee</p>
                  <p className="small">${order.service_fee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Total</p>
                  <p className="fw-bold" style={{ color: " #35558a" }}>
                    ${order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
