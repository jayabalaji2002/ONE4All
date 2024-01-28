import React, { useContext, useRef, useState } from "react";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'


function Navbar() {
  // Moved the useState hook here to declare 'menu' state and 'setMenu' function.
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef  = useRef();
  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <p>ONE4ALL</p>
      </div>
      <img src={nav_dropdown} alt="" onClick={dropdown_toggle} className="nav-dropdown"/>
      <ul className="nav-menu" ref={menuRef}>
        {/* Utilizing 'menu' state and 'setMenu' function in event handlers */}
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            SHOP
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            MEN
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            WOMEN
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            KIDS
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
