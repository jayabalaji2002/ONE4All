import React from 'react'
import './Navbar.css'
import Logo from '../../assets/Ecommerce_Admin_Panel_Assets/nav-logo.svg'
import navProfile from '../../assets/Ecommerce_Admin_Panel_Assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={Logo} alt="logo" className="nav-logo" />
      <img src={navProfile} alt="nav-profile" className="nav-profile" />
      {/* <p>Hello</p> */}
    </div>
  )
}

export default Navbar
