import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout";
import Antmodel from "./BankAntmodelWith";

const BankCashWith = () => {
  const [accountno, setAccountno] = useState("");
  const [pin, setPin] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState();
  const [title, setTitle] = useState();

  const fetchData = async () => {
    if (!accountno) return;
    try {
      const response = await axios.post("http://localhost:5000/accounttitle", {
        accountno: accountno,
      });
      setTitle(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Error fetching account data. Please try again.");
      console.error("Error fetching account data:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    fetchData();
    try {
      if (!accountno || !pin || !creditAmount) {
        setError("Please fill in all fields.");
        return;
      }

      const response = { accountno, pin, creditAmount };

      setResponseData(response);
      console.log(response.accountno, response.pin, response.creditAmount);
    } catch (error) {
      setError("Error processing withdrawal. Please try again.");
      console.error("Error processing withdrawal:", error.message);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center">Cash Withdrawal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter Account No</label>
            <input
              type="number"
              className="form-control"
              value={accountno}
              onChange={(e) => setAccountno(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Credit Amount</label>
            <input
              type="number"
              className="form-control"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ marginRight: '60px' }}>
            Withdraw Cash
          </button>
          <Link className="btn btn-primary mr-3" to="/services" role="button">
            Back
          </Link>
        </form>
        {responseData && <Antmodel data={responseData} title={title} />}
      </div>
    </Layout>
  );
};

export default BankCashWith;
