import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Layout from "../Layout";
import axios from "axios";

const BankPin = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/changepin", {
        accountno: auth.user.accountno,
        pin: parseInt(pin),
        newPin: parseInt(newPin),
      });
      alert("Your Pin Code Changed successfully");
      navigate("/services"); // corrected to lowercase 'navigate'
      setPin("");
      setNewPin("");
    } catch (error) {
      console.error("Error changing pin:", error.message);
    }
  };

  return (
    <Layout>
      <>
        <form onSubmit={handleSubmit} className="container">
          <h2 className="text-center">Change Pin Code</h2>
          <div className="mb-3">
            <label className="form-label">Old Pin</label>
            <input
              type="number"
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Pin</label>
            <input
              type="number"
              className="form-control"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mr-3"   style={{ marginRight: "60px" }}>
            Submit
          </button>
          <Link to="/services" className="btn btn-primary mr-3" role="button">
            Back
          </Link>
        </form>
      </>
    </Layout>
  );
};

export default BankPin;
