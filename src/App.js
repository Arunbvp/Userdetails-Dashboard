import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./LogIn/SignIn";
import UserInfo from "./UserInfo/UserInfo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route
            path="/"
            element={
              isLoggedIn ? <UserInfo /> : <SignIn onLogin={handleLogin} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
