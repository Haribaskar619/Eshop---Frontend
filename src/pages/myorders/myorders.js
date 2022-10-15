import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  axios.interceptors.request.use(function (config) {
    config.headers =  {
      "Authorization" : localStorage.getItem("apps_token")
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  useEffect(() => {
    try {
      
      axios
        .get(`http://localhost:5000/order-list`)
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/getproductdata")
      .then((res) => setProducts(res.data))
      .catch((error) => {throw new Error(error)});
  }, []);

  const showProduct = (id) => {
    console.log(products);
    const prodName = products.filter((product) => product._id === id);
    console.log(prodName, "prodname");
    //    console.log(prodName[0].title)
    if (prodName.length > 0) {
      console.log(prodName[0].title);
      return prodName[0].title;
    }
    return "";
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="align-middle mt-5 ms-5 text-center">My Orders</h2>
        <Link to="/products">
          <button className="btn btn-primary mt-5">Back to Products</button>
        </Link>
      </div>
      {orders ? (
        <div className="row">
          <table class="table  table-striped  mt-5">
            <thead>
              <tr className="bg-success text-white text-center">
                <th scope="col"> order #</th>
                <th scope="col">Details</th>
                <th scope="col">Shipping Address</th>
                <th scope="col"> Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => {
                return (
                  <tr>
                    <th className="text-center" scope="row">
                      {item.razorpay.orderId}
                    </th>
                    <td>
                      {item.productid.map((data) => {
                        return <li>{showProduct(data)}</li>;
                      })}
                    </td>
                    <td>{item.userdetails.address}</td>
                    <td>
                      <span class="badge text-bg-success">Confirmed</span>
                    </td>
                  </tr>
                );
              })}{" "}
              <th scope="row"></th>
            </tbody>
          </table>
        </div>
      ) : (
        <h3>Loading......</h3>
      )}
    </div>
  );
}

export default Myorders;
