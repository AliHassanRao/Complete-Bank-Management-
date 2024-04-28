import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import Layout from "../Layout";
const Deposit = () => {
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const [accountno, setAccountno] = useState(0);
  const [pin, setPin] = useState(0);
  const [newBalance, setNewBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/cashdeposit", {
        accountno: auth.user.accountno,
        pin: parseInt(pin),
        newBalance: parseInt(newBalance)
      });
      const debit=newBalance
      await axios.post("http://localhost:5000/createstatement",{
        bankuser:auth.user._id,debit
      });
    





      
      navigate('/services');
    } catch (error) {
      console.error("Error updating user:", error.message);
     
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
      <h2 className="text-center">Cash Deposit</h2>
      <form onSubmit={handleSubmit}>
     
        
        <div className="mb-3">
          <label className="form-label">Deposit Cash </label>
          <input
            type="number" placeholder="Enter Deposit Amount"
            className="form-control"
            onChange={(e) => setNewBalance(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pin Code</label>
          <input
            type="number"
            placeholder="Pin Code"
            className="form-control"
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginRight: '60px' }}>
          Deposit Cash 
        </button>
        <Link class="btn btn-primary mr-3 " to="/services" role="button">Back</Link>
      </form>
    </div>
    </Layout>
    
  );
};


export default Deposit;
