import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const [datas, setDatas] = useState(null);

  axios.interceptors.request.use(function (config) {
    config.headers =  {
      "Authorization" : localStorage.getItem("app_token")
    }
   
    return config;
  }, function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  });

  useEffect(() => {
    console.log(localStorage.getItem("app_token"));
    axios.get(process.env.REACT_APP_BASE_URL+"getproductdata",{
    }).then((res) => 
      setDatas(res.data)
    ).catch((error) =>  {throw new Error(error)} )
  }, []);

  const addToCart = async (data, index) => {
    const selectedItem = {
      productdetails: data,
      userid: localStorage.getItem("user_id"),
    };
    console.log(selectedItem);
    try {
      const cart = await axios.post(
        process.env.REACT_APP_BASE_URL+"cartitems",
        selectedItem
      );
      if (cart.data) {
        toast.success("Added to the cart");
      } else {
        toast.error("Spmething went wrong");
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const navigate = useNavigate();
  const buyNow = (data) => {
    navigate("/checkout", {
      state: {
        productdetails: data,
        totalamount: data.price,
      },
    });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="section">
      <div className="container-fluid ">
        <div className="card-group">
          {datas ? (
            <div className="row">
              {datas.map((data, index) => {
                return (
                  <div className="col-md-4 h-10">
                    <div className="card mt-5">
                      <img
                        src={data.image}
                        className="card-img-top "
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.price}</p>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(data, index)}
                          >
                            Add to cart
                          </button>
                          <ToastContainer />
                          {/* <Link to={{pathname:"/checkout",
                        state: {productdetails : data} }}  className="btn btn-primary ms-3">
              Buy Now
              </Link> */}
                          <button
                            className="btn btn-primary ms-3"
                            onClick={() => buyNow(data)}
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3>Loading......</h3>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default Products;
