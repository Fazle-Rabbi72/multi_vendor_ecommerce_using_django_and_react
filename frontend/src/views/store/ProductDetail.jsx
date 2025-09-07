import React, { useReducer } from "react";
import { useState, useEffect,useContext } from "react";
import apiInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CardID from "../plugin/CardID";
import Swal from "sweetalert2";
import moment from 'moment'
import { CartContext } from "../plugin/Context";

const toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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

  const [reviews, setReviews] = useState([]);
  const [createReview, setCreateReview] =useState({
    user_id: 0, product_id:product?.id, review: "",rating: 0
  })

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  const cart_id = CardID();

  const [cartCount, setCartCount] =useContext(CartContext)

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

  const handleAddToCart = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("user_id", userData?.user_id);
      formData.append("quantity", quantity);
      formData.append("price", product.price);
      formData.append("shipping_amount", product.shipping_amount);
      formData.append("country", currentAddress.country);
      formData.append("size", sizeValue);
      formData.append("color", colorValue);
      formData.append("cart_id", cart_id);

      const response = await apiInstance.post("cart-view/", formData);
      const url = userData
      ? `/cart-list/${cart_id}/${userData?.user_id}/`
      : `/cart-list/${cart_id}/`;

      apiInstance.get(url).then((res)=>{
        setCartCount(res.data.length)})

      toast.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  const fetchReviewData = async () => {
    if (product) {
      await apiInstance.get(`reviews/${product?.id}/`).then((res) => {
        setReviews(res.data);
      });
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, [product]);


  const handleReviewChange = (event)=>{
      setCreateReview({
        ...createReview,
        [event.target.name]: event.target.value
      })
      
  }

  const handleReviewSubmit =(e)=>{
    e.preventDefault()
    const formdata= new FormData()
    formdata.append("user_id", userData?.user_id)
    formdata.append("product_id",product?.id)
    formdata.append("rating",createReview.rating)
    formdata.append("review",createReview.review)

    apiInstance.post(`reviews/${product?.id}/`,formdata).then((res)=>{
      fetchReviewData();
    })

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
                <div className="container mt-5">
                  <div className="row">
                    {/* 1st column */}
                    <div className="col-md-6">
                      <h2>Create a New Review</h2>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Rating
                          </label>
                          <select name="rating" className="form-select" onChange={handleReviewChange} id="">
                            <option value="1">1 Star</option>
                            <option value="2">2 Star</option>
                            <option value="3">3 Star</option>
                            <option value="4">4 Star</option>
                            <option value="5">5 Star</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="reviewText" className="form-label">
                            {" "}
                            Review
                          </label>
                          <textarea
                            name="review"
                            id="reviewText"
                            className="form-control"
                            rows={4}
                            placeholder="Write your review"
                            value={createReview.review}
                            onChange={handleReviewChange}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit Review
                        </button>
                      </form>
                    </div>
                    {/* 2nd column */}
                    <div className="col-md-6">
                      <h2>Existing Reviews</h2>
                      <div className="card mb-3">
                        {reviews.map((r, index) => (
                          <div className="row g-0" key={index}>
                            <div className="col-md-3">
                              <img
                                src={r.profile.image}
                                alt="User Image"
                                className="img-fluid"
                              />
                            </div>
                            <div className="col-md-9">
                              <div className="card-body">
                                <h5 className="card-title">{r.profile.full_name}</h5>
                                <p className="card-text">{moment(r.date).format("MMM d, YYYY")}</p>
                                <p className="card-text">
                                  {" "}
                                 {r.review} <br />
                                 {r.rating ===1 &&
                                  <i className="fas fa-star"> </i>
                                 }
                                 {r.rating ===2 &&
                                  <>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  </>
                                 }
                                 {r.rating ===3 &&
                                  <>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  </>
                                 }
                                 {r.rating ===4 &&
                                  <>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  </>
                                 }
                                 {r.rating ===5 &&
                                  <>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"> </i>
                                  </>
                                 }
                                
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
