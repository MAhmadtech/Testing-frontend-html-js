// src/accessScreen/googleAuth.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuth = ({ setLoginCredentials }) => {
  const handleLogin = (response) => {
    const token = response.credential;

    fetch("http://localhost:8000/api/api/google-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("User Data:", data.data);
          alert(data.message);

          // Set LoginCredentials to true
          setLoginCredentials(true);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Google Sign-Up/Login</h1>
      <GoogleLogin onSuccess={handleLogin} onError={() => alert("Login failed")} />
    </div>
  );
};

export default GoogleAuth;
