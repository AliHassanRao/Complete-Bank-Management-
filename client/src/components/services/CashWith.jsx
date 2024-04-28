import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Layout from "../Layout";
const CashWith = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState();
  const [newBalance, setNewBalance] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/cashwithdrawal", {
        accountno: auth.user.accountno,
        pin: pin,
        newBalance: newBalance,
      });
      const credit = newBalance;
      await axios.post("http://localhost:5000/createstatement", {
        bankuser: auth.user._id,
        credit,
      });

      navigate("/services");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center">Cash Withdrawal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Credit Amount</label>
            <input
              type="number"
              placeholder="Enter Credit Amount"
              className="form-control"
              onChange={(e) => setNewBalance(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pin Code</label>
            <input
              className="form-control"
              type="number"
              placeholder="Pin Code"
              onChange={(e) => setPin(parseInt(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "60px" }}
          >
            Cash Withdrawal
          </button>
          <Link className="btn btn-primary mr-3" to="/services" role="button">
            Back
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default CashWith;
