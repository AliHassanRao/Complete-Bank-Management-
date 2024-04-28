// components/Routes/PrivateRoute.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        if (response.data.ok) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error while checking authentication:", error);
        setAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return authenticated ? (
    <>{children}</>
  ) : (
    <div>Loading...</div> // You can replace this with a loading spinner component
  );
};

export default PrivateRoute;
