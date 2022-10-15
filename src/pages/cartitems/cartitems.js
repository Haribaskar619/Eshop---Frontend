import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "../cartitems/style.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cartitems() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deleteTotal, setDeleteTotal] = useState(total);
  // const getAllCartItems = async () => {
  //   try {
  //     const getCartItems = await axios.get('http://localhost:5000/cartitems');
  //     console.log(getCartItems);
  //     const data = await getCartItems.json();
  //     setCartItems(data);
  //     console.log(cartItems);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getAllCartItems();
  //   // try {
  //   //   const getCartItems = await axios.get('http://localhost:5000/cartitems');
  //   //   setCartItems(getCartItems);
  //   //   console.log(cartItems);
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }, [])
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
      const requireId = localStorage.getItem("user_id");
      axios
        .get(process.env.REACT_APP_BASE_URL+`cartitems`, {
          params: {
            userid: requireId,
          },
        })
        .then((res) => {
          setCartItems(res.data);
          console.log(res.data);
          const totalPrice = res.data;
          const finalTotal = totalPrice.reduce(function(sum, current) {
            console.log(current);
            return sum + current.productdetails.price;
          }, 0);
          setTotal(finalTotal.toFixed(2));
        });
    } catch (error) {
      console.log("something went wrong");
    }
  }, []);

  const deleteFromCart = async (item, index) => {
    try {
      const deletedItem = await axios.delete(
        process.env.REACT_APP_BASE_URL+`cartitems/${item._id}`
      );
      // console.log(index)
      // if(deletedItem) {
      //   setCartItems(previousState => previousState.splice(index ,1))
      // }
      if (deletedItem) {
        toast.success("Deleted from the cart");
      } else {
        toast.error("Spmething went wrong");
      }
      setCartItems([
        ...cartItems.slice(0, index),
        ...cartItems.slice(index + 1, cartItems.length),
      ]);
      const deletedTotal = total - item.productdetails.price;
      setTotal(deletedTotal.toFixed(2));
    } catch (error) {
      console.log("error");
    }
  };

  const navigate = useNavigate();
  const buyNow = (data) => {
    console.log(data);
    navigate("/checkout", {
      state: {
        productdetails: data,
        totalamount: total,
      },
    });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="conatiner">
        {cartItems ? (
          <div className="container">
            <h2 className="align-middle text-center mt-5">Shopping Cart</h2>
            <table class="table  table-striped  mt-5">
              <thead>
                <tr className="bg-primary text-white text-center">
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Delete from cart</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr>
                      <th className="text-center" scope="row">
                        {index + 1}
                      </th>
                      <td>{item.productdetails.title}</td>
                      <td className="text-center">
                        {item.productdetails.price}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteFromCart(item, index)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <ToastContainer />
                      </td>
                    </tr>
                  );
                })}{" "}
                <th className="p-4" scope="row"></th>
                <td class="bg-light table-active text-center fw-bold ">
                  Total Amount
                </td>
                <td className=" bg-light fw-bold text-center ">Rs.{total}</td>
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary mt-5"
                onClick={() => buyNow(cartItems)}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        ) : (
          <h3>Loading......</h3>
        )}
      </div>
    </>
  );
}

export default Cartitems;
