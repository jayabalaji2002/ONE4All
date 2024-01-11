import React, { useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

function Navbar() {
  // Moved the useState hook here to declare 'menu' state and 'setMenu' function.
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ONE4ALL</p>
      </div>
      <ul className="nav-menu">
        {/* Utilizing 'menu' state and 'setMenu' function in event handlers */}
        <li
          onClick={() => {
            setMenu("shop")
          }}
        >
          <Link style={{textDecoration:"none"}} to="/">SHOP</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => { 
            setMenu("mens")
          }}
        >
          <Link style={{textDecoration:"none"}} to="/mens">MEN</Link>{menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens")
          }}
        >
          <Link style={{textDecoration:"none"}} to="/womens">WOMEN</Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids")
          }}
        >
          <Link style={{textDecoration:"none"}} to="/kids">KIDS</Link>{menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
}

export default Navbar;
