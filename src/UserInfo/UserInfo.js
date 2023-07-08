import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import ResumeUploader from "../ResumeUploader/ResumeUploader";

const UserInfo = () => {
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessTokenResponse = await instance.acquireTokenSilent({
          account: accounts[0],
          scopes: ["User.Read"],
        });

        const response = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.displayName);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.log("Error fetching user info", error);
      }
    };

    if (accounts.length > 0) {
      fetchData();
    }
  }, [accounts, instance]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleLogout = () => {
    console.log("logout");

    // delay(5000);
    navigate("/signin", { replace: true }); // Redirect to the sign-in page
    instance.logout();
  };

  return (
    <div>
      {userName ? (
        <>
          <h3>Welcome, {userName}!</h3>
          <ResumeUploader />
          <button className="logout-button" onClick={() => handleLogout()}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;
