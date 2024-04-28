import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import './styling/HomePage.css'

const HomePage = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        pin: parseInt(pin),
      });

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
          })
        );
        setAuth({
          user: res.data.user,
        });
        if(res.data.user.role ===1){ 
          navigate("/bankservices");
        } else {
          navigate("/services");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error); 
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="main">
      <div className="navbar"></div>
      <div className="content">
        <h1>
          Welcome to
          <br />
          <span>Global Bank</span> <br />
        </h1>

        <div className="form">
          <h2>Login Here</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="string"
              placeholder="Enter Email Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
            <button type="submit" className="btnn">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
