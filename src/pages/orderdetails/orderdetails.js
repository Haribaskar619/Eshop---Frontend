
import React, { useState} from "react";
import { Link, useLocation } from "react-router-dom";

function Orderdetails() {
  const [finalOrder, setFinalOrder] = useState([]);
  const location = useLocation();
  console.log(location);

  // useEffect(() => {
  //  try {
  //     const requireId = localStorage.getItem('user_id');
  //     axios.get('http://localhost:5000/orderdetails',{params: {
  //         userid: requireId
  //       }}).then(res => {
  //         setFinalOrder(res.data);
  //         console.log(res.data);
  //     });
  //  } catch (error) {
  //     console.log("something went wrong")
  //  }
  // }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div class="card text-bg-light mb-3 col-6 mt-5">
          <h5 class="card-header text-center">Order Confirmation Details</h5>
          <div class="card-body text-center">
            <p class="card-text">
              Name : {location.state.orderdetails.userdetails.username}
            </p>
            <p class="card-text">
              Address : {location.state.orderdetails.userdetails.address}
            </p>
            <p class="card-text">
              Total Amount :<b>{location.state.orderdetails.amount }</b>
            </p>
            <p class="card-text">
              Order Status :{" "}
              <span class="badge text-bg-success">Confirmed</span>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/products">
            <button class="btn btn-primary">Continue Shopping</button>
          </Link>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Orderdetails;
