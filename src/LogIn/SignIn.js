import React, { useState } from "react";
import microsoftLogo from "../assets/login/microsoft.png";
import { MsalProvider, useMsal } from "@azure/msal-react";
import {
  PublicClientApplication,
  InteractionStatus,
} from "@azure/msal-browser";
import googleLogo from "../assets/login/google.png";
import "./SignIn.css";
import UserInfo from "../UserInfo/UserInfo";
import { appInsights } from "../AppInsights/AppInsights";

const SignIn = ({ onLogin }) => {
  const msalConfig = {
    auth: {
      clientId: "50267645-eba3-43a9-85b7-dc4d82d93e9f",
      authority:
        "https://login.microsoftonline.com/ffc63b3c-58bc-41c5-9a01-9394d32c4fe6",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { instance, accounts } = useMsal();

  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["user.read"],
      });

      // Handle successful login
      console.log("Microsoft login successful", loginResponse);
      setIsLoggedIn(true);
      onLogin();
    } catch (error) {
      // Handle login error
      console.log("Microsoft login error", error);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
      setIsLoggedIn(false);
    } catch (error) {
      // Handle logout error
      console.log("Logout error", error);
    }
  };

  appInsights.trackPageView({ name: "SignIn" });

  return (
    <div className="sign-in-container">
      {isLoggedIn ? (
        <div>
          <UserInfo />
        </div>
      ) : (
        <div className="sign-in-options">
          <button
            className="sign-in-button microsoft"
            onClick={handleMicrosoftLogin}
            disabled={
              accounts.length > 0 &&
              instance?.interactionStatus !== InteractionStatus.None
            }
          >
            <img src={microsoftLogo} alt="Microsoft" className="sign-in-logo" />
            <span>Continue with Microsoft</span>
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const msalConfig = {
    auth: {
      clientId: "50267645-eba3-43a9-85b7-dc4d82d93e9f",
      authority:
        "https://login.microsoftonline.com/ffc63b3c-58bc-41c5-9a01-9394d32c4fe6",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <div className="app-container">
        <SignIn onLogin={handleLogin} />
      </div>
    </MsalProvider>
  );
};

export default App;
