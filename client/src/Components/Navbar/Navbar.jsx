import React, { useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

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
        <li onClick={() => { setMenu("shop") }}>SHOP{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}>MEN{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}>WOMEN{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}>KIDS{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        <button>Sign In</button>
        <img src={cart_icon} alt="" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
}

export default Navbar;
