import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Antmodel from "./Antmodel";
import { useAuth } from "../../context/auth";
import Layout from "../Layout";

const FundTransfer = () => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth();
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [ndAccount, setNdAccount] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/fundtransfer", {
        accountno: auth.user.accountno,
        pin: parseInt(pin),
        amount: parseInt(amount),
        ndAccount: parseInt(ndAccount),
      });
      setResponseData(data);
      setModalVisible(true);
      // Clear form inputs
      setPin("");
      setAmount("");
      setNdAccount("");
    } catch (error) {
      setError("Error transferring funds. Please try again later.");
      console.error("Error transferring funds:", error.message);
    }
  };

  return (
    <Layout>
      <div
        className="container mt-5"
        style={{ filter: modalVisible ? "blur(5px)" : "none" }}
      >
        <h2 className="text-center">Fund Transfer</h2>
        <form onSubmit={handlePreSubmit}>
         
          <div className="mb-3">
            <label className="form-label">Transfer To</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Beneficiary Account Number"
              value={ndAccount}
              onChange={(e) => setNdAccount(e.target.value)}
              required
            />
          </div>
         
          <div className="mb-3">
            <label className="form-label">Transfer Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "60px" }}
          >
            Transfer Cash
          </button>
          <Link className="btn btn-primary mr-3" to="/services" role="button">
            Back
          </Link>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        {responseData && <Antmodel data={responseData} />}
      </div>
    </Layout>
  );
};

export default FundTransfer;
