import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CardID from "../plugin/CardID";
import Swal from "sweetalert2";

const toast = Swal.mixin({
  toast: true,
  position: "top-center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [colorValue, setColorValue] = useState("No Color");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [quantity, setQuantity] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  const cart_id = CardID();

  const handleColorButtonClick = (event,product_id, color_name) => {
      setColorValue(color_name);
      setSelectedProduct(product_id);

      setSelectedColors((prevSelectedColors) =>({
        ...prevSelectedColors,
        [product_id]: color_name
      }));  
  };
  

  
  const handleSizeButtonClick = (event,product_id, size_name) => {
      setSizeValue(size_name);
      setSelectedProduct(product_id);

      setSelectedSizes((prevSelectedSizes) => ({
        ...prevSelectedSizes,
        [product_id]: size_name
      }));
  };

  const handleQuantityChange = (event, product_id) => {
    setQuantity(event.target.value);
    setSelectedProduct(product_id);
    console.log(quantity);
    
  };

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

  const handleAddToCart= async (product_id,price,shipping_amount)=>{
    const formData = new FormData();

    formData.append("product_id", product_id);
    formData.append("user_id", userData?.user_id);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("shipping_amount",shipping_amount);
    formData.append("country", currentAddress.country);
    formData.append("size", sizeValue);
    formData.append("color", colorValue);
    formData.append("cart_id", cart_id);
    
    const response =await apiInstance.post("cart-view/", formData);
    console.log(response.data)

    toast.fire({
      icon: "success",
      title: response.data.message,
    });

  }
  

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
                              <b>Quantity</b>
                            </li>
                            
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <input  onChange={(e) => handleQuantityChange(e, p.id)} className="form-control" type="number" />
                              </li>
                            </div>
                          </div>
                          {p.size?.length > 0 &&
                          <div className="d-flex flex-column">
                            <li className="p-1">
                              <b>Size</b>: {selectedSizes[p.id] || "No Size"}
                            </li>
                            
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              {p.size?.map((s, index) => (  
                                <li key={index}>
                                <button onClick={(e) => handleSizeButtonClick(e,p.id, s.name)} className="btn btn-secondary btn-sm m-2 mb-1">
                                  {s.name}
                                </button>
                              </li>
                              ))}
                            </div>
                          </div>
                            }
                            {p.color?.length > 0 &&
                          <div className="d-flex flex-column mt-3">
                            <li className="p-1">
                              <b>Color</b>: {selectedColors[p.id] || "No Color"}
                            </li>
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              {p.color?.map((c, index) => (
                                <li key={index}>
                                <button
                                  className="btn  btn-sm me-2 mb-1 p-3"
                                  style={{ backgroundColor: `${c.color_code}` }}
                                  onClick={(e) => handleColorButtonClick(e,p.id, c.name)}
                                  ></button>
                              </li> 
                              ))}
                            </div>
                          </div>
                          }
                          <div className="d-flex mt-3 p-1">
                            <button
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                              onClick={() => handleAddToCart( p.id ,p.price,p.shipping_amount)}
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
