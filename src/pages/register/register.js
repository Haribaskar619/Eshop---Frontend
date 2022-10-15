import axios from "axios";
import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { useFormik } from "formik";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  // const [account, setAccount] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   account[name] = value;
  //   setAccount(account);
  // };

  // const handleSubmit = async() => {
  //   const createData = await axios.post("http://localhost:5000/register",account).then((res) => {
  //       console.log(res);
  //       Notiflix.Notify.Failure('Successful');
  //     })
  //     .catch((err) => {
  //       console.log(err.stack);
  //       Notiflix.Notify.Failure('Failure message text');
  //     });

  //     if(createData){
  //      setAccount({
  //       firstname:'',
  //       lastname:'',
  //       email:'',
  //       password:''
  //      });

  //     }
  // };

  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "Required";
    } else if (values.firstname.length > 15) {
      errors.firstname = "Must be 15 characters or less";
    }
    if (!values.lastname) {
      errors.lastname = "Required";
    } else if (values.lastname.length > 20) {
      errors.lastname = "Must be 20 characters or less";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Min 8 characters or above";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      await axios.post("http://localhost:5000/register", values).then((res) => {
        console.log(res);
        if (res.data.err) {
          toast.error(
            " Email already exists , Please try with different email"
          );
        } else {
          toast.success("Registration Successful");
          navigate("/login")
        }
        
      })
      .catch((err) => {
        console.log(err);

      });
    },
    
  });

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container pt-2" id="regHead">
        Register Form
      </div>
      <div className="container">
        <div className="row pt-3">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="card p-4">
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="col">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    {...formik.getFieldProps("firstname")}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <div className="col ">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    {...formik.getFieldProps("lastname")}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
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

                <div className="col-12 mt-4  d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                  <ToastContainer />
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
