import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  axios.interceptors.request.use(function (config) {
    config.headers =  {
      "Authorization" : localStorage.getItem("apps_token")
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  const addressUpdate = (e) => {
    setAddress(e.target.value);
    console.log(address);
  };
  const userNameUpdate = (ev) => {
    setUserName(ev.target.value);
  };
  // let navigate = useNavigate();
  // const formik = useFormik({
  //   initialValues: {
  //     productid : location.state.productdetails.id,
  //     total :location.state.productdetails.price,
  //     address: "",
  //     paymentdetails :"",
  //     userid : localStorage.getItem('user_id')
  //   },

  //   onSubmit: async (values , res) => {
  //     console.log(values)
  //     await axios.post('http://localhost:5000/orders',values).then((res) =>{
  //     console.log(res);
  //     navigate('/')
  //     }).catch((err) => {
  //       console.log(err.stack);
  //     });
  //   },
  // });

  const orderItem = () => {
    // var productIdArr = [];
    // console.log(location.state.productdetails.length);

    // if (location.state.productdetails.length > 1 ){
    // for (let i=0; i<location.state.productdetails.length ; i++) {
    //     productIdArr.push(location.state.productdetails[i].productdetails.id)
    //   }
    // }else{
    //   productIdArr.push(location.state.productdetails.id);
    // }
    // console.log(productIdArr);
    // const finalOrder = {
    //   productid : productIdArr,
    //   total :location.state.totalamount,
    //   userdetails : {username : userName,
    //                 address : address},
    //   userid : localStorage.getItem('user_id')
    // }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load , Are you online ??");
    };
    script.onload = async () => {
      try {
        const order = await axios.post(process.env.REACT_APP_BASE_URL+"create-order", {
          amount: location.state.totalamount * 100,
          currency: "INR",
        });
        console.log(order);
        const { amount, id: order_id, currency } = order.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(process.env.REACT_APP_BASE_URL+"get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount,
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function(response) {
            var productIdArr = [];

            if (location.state.productdetails.length > 1) {
              for (let i = 0; i < location.state.productdetails.length; i++) {
                productIdArr.push(
                  location.state.productdetails[i].productdetails._id
                );
              }
            } else {
              productIdArr.push(location.state.productdetails[0]._id);
            }

            const result = await axios.post(process.env.REACT_APP_BASE_URL+"pay-order", {
              productid: productIdArr,
              amount: amount / 100,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userdetails: { username: userName, address: address },
              userid: localStorage.getItem("user_id"),
            });
            
            
            if (result) {
              await axios.delete(process.env.REACT_APP_BASE_URL+"cartitems");
            }
            navigate("/orderdetails", {
              state: {
                orderdetails: result.data,
              },
            });
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "11111111",
          },
          theme: {
            color: "#80c0f0",
          },
        };
       
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log("Something went Wrong");
      }
    };
    document.body.appendChild(script);
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-2 p-4 text-center">Checkout</h2>

        <div className="row ">
          <div className="col-lg-8">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your name"
                name="username"
                onChange={userNameUpdate}
                value={userName.userName}
              />
            </div>
            <div class="mb-3">
              <label
                for="exampleFormControlTextarea1"
                class="form-label"
                name="add"
              >
                Enter your address
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                name="add"
                rows="3"
                onChange={addressUpdate}
                value={address.add}
              ></textarea>
            </div>
            {/* <h3>Payment Info</h3>
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Enter Credit/Debit Card Number"/>
</div>
<div class="input-group mb-3">
  <input type="text" class="form-control"placeholder="Enter Name of the Card Holder"/>
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="cvv number" aria-label="Username"/>
  <input type="month" class="form-control" placeholder="Expiry Date" aria-label="Server"/>
</div> */}
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary mt-3 "
                type="button"
                onClick={() => orderItem()}
              >
                Confirm & Pay
              </button>
              <Link to="/cartitems">
                <button className="btn btn-primary mt-3 ms-4 ">
                  Back to cart
                </button>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 ">
            <div class="card mt-4 ">
              <div class="card-body">
                <h5 class="card-title">Order Summary</h5>
                <p class="card-text">
                  Your order is eligible for FREE Delivery.
                </p>
                <p class="card-text">Quantity : 1</p>
                <p class="card-text"></p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Order Total :{location.state.totalamount}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
