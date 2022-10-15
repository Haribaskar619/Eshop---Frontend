import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  var usertoken = localStorage.getItem("app_token");
  var admintoken = localStorage.getItem("admin_token");
  
  axios.interceptors.request.use(function (config) {
    config.headers =  {
      "Authorization" : localStorage.getItem("apps_token")
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  const handleClick = async (values) => {
    try {
      const token = localStorage.getItem("app_token");
      console.log(token);
      const home = await axios.get("http://localhost:5000/welcome", values);
      console.log(home);
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("app_token");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">Eshop</a>
        {/* <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active"
                aria-current="page"
                onClick={() => handleClick()}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link active"
                aria-current="page"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              {(usertoken || !admintoken )  && (<Link
                to="/myorders"
                className="nav-link active"
                aria-current="page"
              >
                My Orders
              </Link>)}
            </li>
          </ul>
          <div>
          {!usertoken && admintoken && <Link to="/addproducts">
              <button className="btn btn-outline-light">Add Products</button>
            </Link>}
             {usertoken && (<Link to="/cartitems">
              <button className="btn btn-outline-light ms-3">Cart</button>
            </Link>)}
            {!usertoken && !admintoken && (
              <Link to="/login">
                <button className="btn btn-outline-light ms-3">Login</button>
              </Link>
            )}
            {!usertoken && !admintoken && (
              <Link to="/register">
                <button className="btn btn-outline-light ms-3">Register</button>
              </Link>
            )}
            {(usertoken || admintoken) && (
              <Link to="/">
                <button className="btn btn-outline-light ms-3" onClick={logOut}>
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
