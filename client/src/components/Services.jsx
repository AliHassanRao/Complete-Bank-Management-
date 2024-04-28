import React from "react";
import { Link } from "react-router-dom";
import cash from "./asserts/cash.png";
import deposit from "./asserts/deposit.png";
import balance from "./asserts/balance.png";
import pin from "./asserts/pin.png";
import statment from "./asserts/statment.png";
import transfer from "./asserts/transfer.png";
import "./asserts/Services.Module.css";
import Layout from "./Layout";
import { useAuth } from "../context/auth";
const Services = () => {
  const [auth, setAuth] = useAuth();
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  return (
    <Layout>
  <div className="container mt-5">
  <div style={{ display: "flex", justifyContent: "space-around" }}>
      <h5 style={{ fontWeight: "bold"}}>Account Type: {auth.user.name === 'Admin' ? (<span style={{ fontWeight: "bold",textTransform:"uppercase"}}>
          Admin
        </span>) : (<span style={{ fontWeight: "bold",textTransform:"uppercase"}}>User</span>)}</h5>
    <h5> <div className="App">
            <h5 align="center">Current Time</h5>
            <h6 align="center"> {showTime}</h6>
        </div></h5>
      <h5 style={{ fontWeight: "bold"}}>Name: {auth.user.name}</h5>
    </div>
      <h2 className="text-center mb-4"> ATM Services</h2>
    
      <div className="row">
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img src={cash} className="card-img-top mb-2" alt="Cash Withdrawal" />
            <div className="card-body">
              <Link to="/cashwithdrawal" className="btn btn-success">
                Cash Withdrawal
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img src={deposit} className="card-img-top mb-2" alt="Cash Deposit" />
            <div className="card-body">
              <Link to="/cashdeposit" className="btn btn-success">
                Cash Deposit
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img src={transfer} className="card-img-top mb-4" alt="Fund Transfer" />
            <div className="card-body">
              <Link to="/fundtransfer" className="btn btn-success">
                Fund Transfer
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img
              src={balance}
              className="card-img-top mb-4"
              alt="Balance Inquiry"
            />
            <div className="card-body">
              <Link to="/balanceinquiry" className="btn btn-success ">
                Balance Inquiry
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img
              src={statment}
              className="card-img-top mb-2"
              alt="Bank Statement"
            />
            <div className="card-body">
              <Link to="/statement" className="btn btn-success">
                Bank Statement
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-2 mb-4">
          <div className="card h-100 service-card">
            <img src={pin} className="card-img-top mb-2" alt="Change Pin" />
            <div className="card-body">
              <Link to="/changepin" className="btn btn-success">
                Change Pin Code
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </Layout>
  
  );
};

export default Services;
