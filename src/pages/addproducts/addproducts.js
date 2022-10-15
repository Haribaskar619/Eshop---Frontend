import React, { useState } from 'react'
import Navbar from '../navbar/navbar';
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import "./style.css";

function Addproducts() {
    const [image , setImage] = useState([])
    axios.interceptors.request.use(function (config) {
      config.headers =  {
        "Authorization" : localStorage.getItem("apps_token")
      }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    const validate = (values) => {
      const errors = {};
  
      if (!values.category) {
        errors.category = "Required , Please enter the category";
      } 
      if (!values.description) {
        errors.description = "Required , Please Upload the Description";
      } 
      if (!image) {
        errors.image = "Required , Please Upload the image";
      } 
      
      if (!values.price) {
        errors.price = "Required , Please enter the price";
      } 
      if (!values.count) {
        errors.count = "Required";
      } 
      if (!values.rate) {
        errors.rate = "Required";
      } 
      if (!values.title) {
        errors.title = "Required";
      } 

      return errors;
    };

    const formik = useFormik({
       initialValues: {
        category: "",
        description:"",
        image:"",
        price:"",
        count:"",
        rate:"",
        title:"",
       },
       validate,
       onSubmit: async (values,{resetForm}) => {
        console.log(values);
        try {
            const createProductData = await axios.post( process.env.REACT_APP_BASE_URL+"addproductdata",values,values.image = image);
            console.log(createProductData);
            if(createProductData){
              toast.success("New Product Added");
                resetForm({values:""});
                
            }else {
              toast.error("Please Try again");
            }
        } catch (error) {
            console.log(error);
        }
       }
    })

    const uploadImage = async (e) => {
        const files = e.target.files;
        const file = files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
    }
  
    const convertBase64 = (file) => {
      return new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }  
    
  return (
    <>
    <div>
        <Navbar/>
    </div>
    <div className='container'>   
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6 mt-3' id='proddata'>
                <h3>Enter New Product Detail</h3>
            <div className="card p-4">
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="col">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="category"
                    className="form-control"
                    id="category"
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                  />
                   {formik.touched.category && formik.errors.category ? (
                    <div className='req'>{formik.errors.category}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="description"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                   {formik.touched.description && formik.errors.description ? (
                    <div className='req'>{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label for="image" className="form-label">
                    Image
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(e)=>{uploadImage(e)}}
                    onBlur={formik.handleBlur}
                  />
                    {formik.touched.image && formik.errors.image ? (
                    <div className='req'>{formik.errors.image}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="price"
                    className="form-control"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                   {formik.touched.price && formik.errors.price ? (
                    <div className='req'>{formik.errors.price}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="count" className="form-label">
                    Count
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="count"
                    className="form-control"
                    id="count"
                    name="count"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.count}
                  />
                   {formik.touched.count && formik.errors.count ? (
                    <div className='req'>{formik.errors.count}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="rate" className="form-label">
                    Rate
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="rate"
                    className="form-control"
                    id="rate"
                    name="rate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rate}
                  />
                  {formik.touched.rate && formik.errors.rate ? (
                    <div className='req'>{formik.errors.rate}</div>
                  ) : null}
                </div>
                <div className="col d-flex justify-content-sm">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  </div>
                  <div className="col">
                  <input
                    type="title"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className='req'>{formik.errors.title}</div>
                  ) : null}
                </div>
                <div className="col-12 mt-4  d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <ToastContainer/>
                  <Link to='/editproducts'>
                    <button type="submit" className="btn btn-primary ms-3"> Edit Product Details</button>
                  </Link>
                </div>
              </form>
            </div>
            </div>
            <div className='col-3'></div>
        </div>
    </div>
    </>
  )
}

export default Addproducts;