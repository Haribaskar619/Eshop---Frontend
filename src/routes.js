import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing"
import Dashboard from './pages/dashboard/dashboard';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Products from './pages/products/products';
import Checkout from './pages/cartitems/checkout';
import Cartitems from './pages/cartitems/cartitems';
import Orderdetails from './pages/orderdetails/orderdetails';
import Myorders from './pages/myorders/myorders';
import Addproducts from './pages/addproducts/addproducts';
import Editproducts from './pages/editproducts/editproducts';

function Router() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cartitems" element={<Cartitems/>}/>
          <Route path="/orderdetails" element={<Orderdetails/>}/>
          <Route path="/myorders" element={<Myorders />} />
          <Route path="/addproducts" element={<Addproducts/>}/>
          <Route path="/editproducts" element={<Editproducts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default Router;
