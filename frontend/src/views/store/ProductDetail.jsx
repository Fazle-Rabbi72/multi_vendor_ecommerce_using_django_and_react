import React from "react";
import { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CardID from "../plugin/CardID";


const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [specifications, setSpecifications] = useState([]);
  const [images, setImages] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [colorValue, setColorValue] = useState("No Color");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [quantity, setQuantity] = useState(1);

 const currentAddress = GetCurrentAddress();
 const userData = UserData();
 const cart_id=CardID();

 console.log(cart_id);
 

 

  

  useEffect(() => {
    apiInstance.get(`products/${params.slug}/`).then((res) => {
      setProduct(res.data);
      setSpecifications(res.data.specification);
      setImages(res.data.gallery);
      setColor(res.data.color);
      setSize(res.data.size);

    });
  }, []);

  const handleColorButtonClick = (event) => {
    const colorNameInput = event.target
      .closest(".color_button")
      .parentNode.querySelector(".color_name");
    setColorValue(colorNameInput.value);
  };

  const handleSizeButtonClick = (event) => {
    const sizeNameInput = event.target
      .closest(".size_button")
      .parentNode.querySelector(".size_name");
    setSizeValue(sizeNameInput.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  
  const handleAddToCart = () => {
    console.log("product id:",product.id)
    console.log("product price:",product.price)
    console.log("shipping Amount:",product.shipping_amount)
    console.log("product price:",product.price)
    console.log("quantity:",quantity)
    console.log("color:",colorValue)
    console.log("size:",sizeValue)
    console.log("country:",currentAddress.country)
    console.log("user_id:",userData?.user_id)
  }
    
      
      
  

  return (
    <main className=" mb-4 mt-4">
      <div className="container">
        {/* {Section : Product Detail} */}
        <section className="mb-9">
          <div className="row gx-lg-5">
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Gallery */}
              <div className="">
                <div className="row gx-2 gx-lg-3">
                  <div className="col-12 col-lg-12">
                    <div className="lightbox">
                      <img
                        src={product.image}
                        style={{
                          width: "100%",
                          height: 500,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        alt="Gallery image 1"
                        className="ecomarce-gallery-main-img active w-100 rounded-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 d-flex">
                  {images.map((i, index) => (
                    <div className="p-3" key={index}>
                      <img
                        src={i.image}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        alt="Gallery image 1"
                        className="ecomarce-gallery-sub-img active w-100 rounded-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Gallery */}
            </div>
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Details */}
              <div>
                <h1 className="fw-bold mb-3">{product.title}</h1>
                <div className="d-flex text-primary just align-items-center">
                  <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      ></i>
                    </li>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      ></i>
                    </li>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      ></i>
                    </li>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      ></i>
                    </li>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      ></i>
                    </li>
                    <li style={{ marginLeft: 10, fontSize: 13 }}>
                      <a href="" className="text-decoration-none">
                        <strong className="me-2">4/5</strong>(2 reviews)
                      </a>
                    </li>
                  </ul>
                </div>
                <h5 className="mb-3">
                  <s className="text-muted me-2 small align-middle">
                    ${product.old_price}
                  </s>
                  <span className="align-middle">${product.price}</span>
                </h5>
                <p className="text-muted">{product.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0 w-25" scope="row">
                          <strong>Category</strong>
                        </th>
                        <td>{product.category?.title}</td>
                      </tr>
                      {specifications?.map((s, index) => (
                        <tr key={index}>
                          <th className="ps-0 w-25" scope="row">
                            <strong>{s.title}</strong>
                          </th>
                          <td>{s.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr className="my-5" />
                <form action="">
                  <div className="frow">
                    <div className="col-md-6 mb-4">
                      <label className="form-label">Quantity</label>
                      <div className="form-outline">
                        <input
                          type="number"
                          id="typeNumber"
                          className="form-control"
                          value={quantity}
                          min={1}
                          onChange={handleQuantityChange}
                        />
                      </div>
                    </div>
                    {/* size */}
                    {size.length > 0 && (
                      <>
                        <h6>
                          Size: <span>{sizeValue}</span>
                        </h6>
                        <div className="col-md-6 mb-4">
                          <div className="d-flex">
                            {size?.map((s, index) => (
                              <div key={index}>
                                <input
                                  type="hidden"
                                  className="size_name"
                                  value={s.name}
                                  name=""
                                  id=""
                                />
                                <button
                                  className="btn btn-secondary p-3 m-1 size_button"
                                  type="button"
                                  onClick={handleSizeButtonClick}
                                  
                                >
                                  {s.name}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {/* Colors */}
                    {color.length > 0 && (
                      <>
                        <h6>
                          Color: <span>{colorValue}</span>
                        </h6>
                        <div className="col-md-6 mb-4">
                          <div className="d-flex">
                            {color?.map((c, index) => (
                              <div key={index}>
                                <input
                                  type="hidden"
                                  className="color_name"
                                  value={c.name}
                                  name=""
                                  id=""
                                />
                                <button
                                  className="btn  p-3 m-1 color_button"
                                  type="button"
                                  onClick={handleColorButtonClick}
                                  style={{ backgroundColor: `${c.color_code}` }}
                                  key={index}
                                ></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Add to cart */}
                  <button
                    type="button"
                    className="btn btn-primary btn-rounded me-2"
                    onClick={handleAddToCart}
                  >
                    <i className="fas fa-cart-plus me-2"></i>
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-floating"
                    data-mdb-toggle="tooltip"
                    title="Add to wishlist"
                  >
                    <i className="fas fa-heart me-2"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <hr />
        {/* Tab Section */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs" id="productTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="spec-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#spec"
                  type="button"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="vendor-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#vendor"
                  type="button"
                >
                  Vendor
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#review"
                  type="button"
                >
                  Review
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="qa-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#qa"
                  type="button"
                >
                  Question & Answer
                </button>
              </li>
            </ul>

            <div
              className="tab-content p-3 border border-top-0"
              id="productTabContent"
            >
              <div
                className="tab-pane fade show active"
                id="spec"
                role="tabpanel"
              >
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0 w-25" scope="row">
                          {" "}
                          <strong>Category</strong>
                        </th>
                        <td>{product.category?.title}</td>
                      </tr>
                      {specifications?.map((s, index) => (
                        <tr key={index}>
                          <th className="ps-0 w-25" scope="row">
                            <strong>{s.title}</strong>
                          </th>
                          <td>{s.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tab-pane fade" id="vendor" role="tabpanel">
                <p>Vendor: ABC Fashion House</p>
              </div>
              <div className="tab-pane fade" id="review" role="tabpanel">
                <p>⭐⭐⭐⭐⭐ - Great Quality!</p>
              </div>
              <div className="tab-pane fade" id="qa" role="tabpanel">
                <p>
                  Q: Is this pure cotton?
                  <br />
                  A: Yes, 80% Cotton, 20% mixed fiber.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
