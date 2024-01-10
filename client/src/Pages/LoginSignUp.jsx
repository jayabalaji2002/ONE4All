import React from "react";
// import Loginvid from "../Components/Assets/Loginvid.mp4";
// import Logo from "../Components/Assets/logo_big.png";
// import { Link } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// import { AiOutlineSwapRight } from "react-icons/ai";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { MdAttachEmail } from "react-icons/md";
// import '../App.css'

import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {
  return (
    // <div className="loginPage flex">
    //   <div className="contanier flex">
    //     {/* <div className="videoDiv">
    //       <video src={Loginvid} autoPlay muted loop></video>
    //       <div className="textDiv">
    //         <h2 className="title">Create And Sell Extraordinary Products</h2>
    //         <p>Adopt the peace of nature!</p>
    //       </div>
    //       <div className="footerDiv flex">
    //         <span className="text">Don't have an account?</span>
    //         <Link to={"/register"}>
    //           <button className="btn">Sign Up</button>
    //         </Link>
    //       </div>
    //     </div> */}

    //     <div className="formDiv flex">
    //       <div className="headerDiv">
    //         <img src={Logo} alt="" />
    //         <h3>Welcome Back!</h3>
    //       </div>

    //       <form action="" className="form grid">
    //         <span>Login status will go here</span>

    //         <div className="inputDiv">
    //           <label htmlFor="username">Username</label>
    //           <div className="input flex">
    //             <FaUserShield className="icon" />
    //             <input type="text" id="namne" placeholder="Enter Name" />
    //           </div>
    //         </div>

    //         <div className="inputDiv">
    //           <label htmlFor="email">Email</label>
    //           <div className="input flex">
    //             <MdAttachEmail className="icon" />
    //             <input type="email" id="email" placeholder="Enter email" />
    //           </div>
    //         </div>
    //         <div className="inputDiv">
    //           <label htmlFor="password">Password</label>
    //           <div className="input flex">
    //             <BsFillShieldLockFill className="icon" />
    //             <input
    //               type="password"
    //               id="password"
    //               placeholder="Enter Password"
    //             />
    //           </div>
    //         </div>
    //         <button type="submit" className="btn flex">
    //           <span>Login</span>
    //           <AiOutlineSwapRight className="icon" />
    //         </button>
    //         <span className="forgotPassword">
    //           Forgot Password? <a href="">Click here</a>
    //         </span>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already have an Account? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" className="checkBox" id="check" />
          <label htmlFor="check">
            By continuing, i agree to the <span>Terms@Conditions</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
