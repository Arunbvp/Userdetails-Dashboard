import React from "react";
import microsoftLogo from "../assets/login/microsoft.png";
import googleLogo from "../assets/login/google.png";
import "./SignIn.css";

const SignIn = () => {
  const handleMicrosoftLogin = () => {
    console.log("Microsoft login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="sign-in-container">
      {/* <h2 className="sign-in-title">Sign In</h2> */}
      <div className="sign-in-options">
        <button
          className="sign-in-button microsoft"
          onClick={handleMicrosoftLogin}
        >
          <img src={microsoftLogo} alt="Microsoft" className="sign-in-logo" />
          <span>Continue with Microsoft</span>
        </button>
        {/* <button className="sign-in-button google" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google" className="sign-in-logo" />
        </button> */}
      </div>
    </div>
  );
};

export default SignIn;
