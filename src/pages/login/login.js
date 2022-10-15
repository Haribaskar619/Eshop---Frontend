import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/navbar";
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isAdmin:false,
    },

    onSubmit: async (values) => {
      console.log(values);
      await axios.post("http://localhost:5000/login", values)
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("app_token", res.data[0].token);
          if (res.data[0].isAdmin === true) {
            window.localStorage.setItem("isAdmin", res.data[0].isAdmin);
          navigate("/");
          }else if (res.data[0].isAdmin === false) {
            window.localStorage.setItem("isAdmin", res.data[0].isAdmin);
          navigate("/");
          }else {
            alert(res.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data);  
         console.log(error.response.status);  
         console.log(error.response.headers); 
        });
    }, 
  });
  const googleAuth = async () => {
    // window("http://localhost:5000/auth/google")
    window.open(process.env.REACT_APP_BASE_URL+"/auth/google", "_self")
}

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container pt-2" id="regHead">
        Login
      </div>
      <div className="container">
        <div className="row pt-3">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="card p-4">
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="col  ">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="col ">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <FontAwesomeIcon icon={faKey} />
                  </div>
                  <div className="col">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" id="isAdmin" name="isAdmin" onChange={formik.handleChange}
                    onBlur={formik.handleBlur} value={formik.values.checkbox}/>
                 <label className="form-check-label" for="flexCheckDefault">
                  Login as admin
                </label>
                </div>
                <div className="col-12 mt-4  d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form><br></br>
              <h3 className="d-flex justify-content-center"> OR</h3>
              <br></br>
              <button className="btn btn-primary" onClick={() => googleAuth()}>Sign in with Google</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
