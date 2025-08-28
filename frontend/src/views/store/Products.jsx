import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    apiInstance.get("products/").then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(()=>{
    apiInstance.get("category/").then((res)=>{
      setCategory(res.data)
    })
  },[])
  console.log(category);

  return (
    <>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {products?.map((p, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      <Link to={`/detail/${p?.slug}/`}>
                      <img
                        src={p?.image}
                        className="w-100"
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      </Link>
                    </div>
                    <div className="card-body">
                      <Link to={`/detail/${p?.slug}/`}>
                      <h5 className="card-title mb-3">{p?.title}</h5>
                      </Link>
                      <a href="" className="text-reset">
                        <p>{p.category?.title}</p>
                      </a>
                      <div className="d-flex justify-content-center">
                        <h6 className="mb-3">${p?.price}</h6>
                        <h6 className="mb-3 text-muted ms-2 ">
                          <strike>${p?.old_price}</strike>
                        </h6>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuClickable"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="false"
                          aria-expanded="false"
                        >
                          Variation
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuClickable"
                        >
                          <div className="d-flex flex-column">
                            <li className="p-1">
                              <b>Size</b>: XL
                            </li>
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <button className="btn btn-secondary btn-sm m-2 mb-1">
                                  XXL
                                </button>
                              </li>
                              <li>
                                <button className="btn btn-secondary btn-sm m-2 mb-1">
                                  XXL
                                </button>
                              </li>
                              <li>
                                <button className="btn btn-secondary btn-sm m-2 mb-1">
                                  XXL
                                </button>
                              </li>
                            </div>
                          </div>
                          <div className="d-flex flex-column mt-3">
                            <li className="p-1">
                              <b>Color</b>: Red
                            </li>
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <button
                                  className="btn btn-secondary btn-sm m-2 mb-1"
                                  style={{ backgroundColor: "blue" }}
                                ></button>
                              </li>
                              <li>
                                <button
                                  className="btn btn-secondary btn-sm m-2 mb-1"
                                  style={{ backgroundColor: "green" }}
                                ></button>
                              </li>
                              <li>
                                <button
                                  className="btn btn-secondary btn-sm m-2 mb-1"
                                  style={{ backgroundColor: "yellow" }}
                                ></button>
                              </li>
                            </div>
                          </div>
                          <div className="d-flex mt-3 p-1">
                            <button
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                            >
                              <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger me-1 mb-1 ,ms-2"
                            >
                              <i className="fa-solid fa-heart"></i>
                            </button>
                          </div>
                        </ul>
                        <button
                          type="button"
                          className="btn btn-danger px-3 me-1 ms-2"
                        >
                          <i className="fa-solid fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row">
                {category?.map((c, index) => (
                  
                  <div className="col-lg-2" key={index}>
                  <img
                    src={c?.image}
                    style={{  width: "100px",height:"100px" ,borderRadius:"50%",objectFit:"cover" }}
                    alt=""
                    />
                  <h6>{c?.title}</h6>
                </div>
                  ))}
                
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Products;
