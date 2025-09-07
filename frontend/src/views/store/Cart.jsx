import React, { useEffect, useState } from "react";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import CardID from "../plugin/CardID";
import GetCurrentAddress from "../plugin/UserCountry";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const userData = UserData();
  const cart_id = CardID();
  const currentAddress = GetCurrentAddress();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const fetchCartData = async (cartId, userId) => {
    const url = userId
      ? `/cart-list/${cartId}/${userId}/`
      : `/cart-list/${cartId}/`;

    await apiInstance
      .get(url)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCartTotal =async (cartId, userId) => {
    const url = userId
      ? `/cart-detail/${cartId}/${userId}/`
      : `/cart-detail/${cartId}/`;

    await apiInstance
      .get(url)
      .then((res) => {
        setCartTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (cart_id !== null || cart_id !== undefined) {
    if (userData !== undefined) {
      useEffect(() => {
        fetchCartData(cart_id, userData?.user_id);
        fetchCartTotal(cart_id, userData?.user_id);
      }, []);
    } else {
      useEffect(() => {
        fetchCartData(cart_id);
        fetchCartTotal(cart_id);
      }, []);
    }
  }

  useEffect(() => {
    const initialQuantity = {};
    cart.forEach((c) => {
      initialQuantity[c.product.id] = c.quantity;
    });
    setProductQuantity(initialQuantity);
  }, [cart]);

  const handleQuantityChange = (event, product_id) => {
    const quantity = event.target.value;
    setProductQuantity((prevQuantity) => ({
      ...prevQuantity,
      [product_id]: quantity,
    }));
  };

  const updateCart = async (
    product_id,
    price,
    shipping_amount,
    color,
    size
  ) => {
    const qtyValue = productQuantity[product_id];

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("user_id", userData?.user_id);
    formData.append("quantity", qtyValue);
    formData.append("price", price);
    formData.append("shipping_amount", shipping_amount);
    formData.append("country", currentAddress.country);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("cart_id", cart_id);

    const response = await apiInstance.post("cart-view/", formData);
    fetchCartData(cart_id, userData?.user_id);
    fetchCartTotal(cart_id, userData?.user_id);
    Toast.fire({
      icon: "success",
      title: response.data.message,
    });
  };

  const handleDeleteCartItem = (itemId) => {
    const url = userData?.user_id
      ? `/cart-delete/${cart_id}/${itemId}/${userData?.user_id}/`
      : `/cart-delete/${cart_id}/${itemId}/`;
    apiInstance.delete(url).then((res) => {
      fetchCartData(cart_id, userData?.user_id);
      fetchCartTotal(cart_id, userData?.user_id);
    });
    Toast.fire({
      icon: "success",
      title: "Item deleted successfully",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fullName") {
      setFullName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "mobile") {
      setMobile(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "state") {
      setState(value);
    } else if (name === "country") {
      setCountry(value);
    }
  };

  const createOrder = async() =>{
    if(!fullName || !email || !mobile || !address || !city || !state || !country){
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all the required fields.",
      });
    }
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("cart_id", cart_id);
    formData.append("user_id", userData?userData?.user_id:0);

    const response= await apiInstance.post("create-order/", formData); 
    navigate(`/checkout/${response.data.order_oid}`);
  }

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
                  {/* section product list */}
                  <section className="mb-5">
                    {/* cart item */}
                    {cart.map((c, index) => (
                      <div className="row border-bottom mb-4" key={index}>
                        <div className="col-md-2 mb-4 mb-md-0">
                          <div
                            className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                            data-ripple-color="light"
                          >
                            <img
                              src={c.product.image}
                              className="w-100"
                              alt=""
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "hsla(0, 0%, 98.4%, 0.2)",
                                }}
                              ></div>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-8 mb-4 mb-md-0">
                          <p className="fw-bold"> {c.product?.title}</p>
                          {c.size !== "No Size" && (
                            <p className="mb-1">
                              <span className="text-muted me-2">Size:</span>
                              <span>{c.size}</span>
                            </p>
                          )}
                          {c.color !== "No Color" && (
                            <p className="mb-1">
                              <span className="text-muted me-2">Color:</span>
                              <span>{c.color}</span>
                            </p>
                          )}

                          <p className="mb-1">
                            <span className="text-muted me-2">Price:</span>
                            <span>${c.price}</span>
                          </p>
                          <p className="mb-4">
                            <a
                              onClick={() => handleDeleteCartItem(c.id)}
                              href="#"
                              className="text-danger pe-3 border-end"
                            >
                              <small>
                                <i className="fas fa-trash me-2"></i>
                                Remove
                              </small>
                            </a>
                          </p>
                        </div>
                        <div className="col-md-2 mb-4 mb-md-0">
                          <div className="form-outline mb-4 ">
                            <label
                              htmlFor="typeNumber"
                              className="me-2 mb-0 text-muted"
                            >
                              Quantity
                            </label>
                            <input
                              type="number"
                              id="typeNumber"
                              className="form-control"
                              value={
                                productQuantity[c.product?.id] || c.quantity
                              }
                              min={1}
                              onChange={(e) =>
                                handleQuantityChange(e, c.product?.id)
                              }
                            />
                            <button
                              onClick={() =>
                                updateCart(
                                  c.product?.id,
                                  c.product?.price,
                                  c.product?.shipping_amount,
                                  c.color,
                                  c.size
                                )
                              }
                              className="btn btn-primary mt-2"
                            >
                              <i className="fas fa-rotate-right"></i>
                            </button>
                          </div>
                          <h5 className="mb-2">
                            <span className="align-middle">${c.sub_total}</span>
                          </h5>
                          <p className="text-dark">
                            <small>Sub total</small>
                          </p>
                        </div>
                      </div>
                    ))}

                    {cart.length < 1 && (
                      <div className="text-center">
                        <h3 className="text-primary">Your cart is empty</h3>
                      </div>
                    )}
                    {/* end cart item */}
                  </section>
                  {cart.length > 0 && (
                    <div>
                      <h5 className="mb-4 mt-4">Contact Information</h5>
                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="Full Name"
                              value={fullName}
                              onChange={handleChange}
                              name="fullName"

                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="Email"
                              value={email}
                              onChange={handleChange}
                              name="email"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="Mobile"
                              value={mobile}
                              onChange={handleChange}
                              name="mobile"
                            />
                          </div>
                        </div>
                      </div>
                      <h5 className="mb-4 mt-5">Shipping Information</h5>
                      <div className="row mb-4">
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="Address"
                              value={address}
                              onChange={handleChange}
                              name="address"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="City"
                              value={city}
                              onChange={handleChange}
                              name="city"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="State"
                              value={state}
                              onChange={handleChange}
                              name="state"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              placeholder="Country"
                              value={country}
                              onChange={handleChange}
                              name="country"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-4 mb-4 mb-md-0">
                  {/* section summary */}
                  <section className="shadow-4 p-4 rounded-5 mb-4">
                    <h5 className="mb-5">Cart Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Sub Total</span>
                      <span>${cartTotal.sub_total?.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Tax Fee</span>
                      <span>${cartTotal.tax?.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Service Fee</span>
                      <span>${cartTotal.service_fee?.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping</span>
                      <span>${cartTotal.shipping?.toFixed(2)}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between fw-bold mb-5">
                      <span>Total</span>
                      <span>${cartTotal.total?.toFixed(2)}</span>
                    </div>
                    <button onClick={createOrder} type="button" className="btn btn-primary w-100">
                      Proceed to checkout{" "}
                      <i className="fas fa-long-arrow-alt-right ms-2"></i>
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

export default Cart;
