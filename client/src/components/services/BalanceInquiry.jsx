import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const BalanceInquiry = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.user.accountno || !pin) {
      console.error("Please enter both account number and PIN.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/balanceinquiry",
        {
          accountno: auth.user.accountno,
          pin: parseInt(pin),
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center">Balance Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter Your Pin</label>
            <input
              type="number"
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            style={{ marginRight: "60px" }}
          >
            Check Balance
          </button>

          <Link to="/services" className="btn btn-primary ml-3">
            Back
          </Link>
        </form>

        {user ? (
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Hi {user.name}</h4>
            <h4 className="alert-heading">Balance: Rs {user.balance}</h4>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default BalanceInquiry;
