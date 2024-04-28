import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout";

const Bank = () => {
  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const allUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const usersData = response.data;
      const totalBalance = usersData.reduce((acc, user) => acc + user.balance, 0);
      setTotalBalance(totalBalance);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <Layout>
 <div className="container my-3">
      <h2 className="text-center">Welcome to Global Bank</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Total Bank Balance</h3>
              <h4 className="card-subtitle text-center">Rs. {totalBalance}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Total No of Customers</h3>
              <h4 className="card-subtitle text-center">{users.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
   
  );
};

export default Bank;
