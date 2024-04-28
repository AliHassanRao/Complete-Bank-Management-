// components/Routes/AdminRoute.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin");
        if (response.data.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error while checking admin authentication:", error);
        setIsAdmin(false);
        navigate("/login");
      }
    };

    checkAdminAuth();
  }, [navigate]);

  return isAdmin ? (
    <>{children}</>
  ) : (
    <div>Loading...</div> // You can replace this with a loading spinner component
  );
};

export default AdminRoute;
