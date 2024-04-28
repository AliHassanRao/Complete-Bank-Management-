import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    accountno: "",
    balance: "",
    pin: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newUser = await axios.post("http://localhost:5000/create", userData);
      console.log(newUser.data);
      navigate("/allpost");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }

    setUserData({
      name: "",
      email: "",
      phone: "",
      accountno: "",
      balance: "",
      pin: ""
    });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center">Enter Customer Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="accountno" className="form-label">
              Account No
            </label>
            <input
              type="text"
              className="form-control"
              id="accountNo"
              name="accountno"
              value={userData.accountNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="balance" className="form-label">
              Balance
            </label>
            <input
              type="number"
              className="form-control"
              id="balance"
              name="balance"
              value={userData.balance}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pin" className="form-label">
              Pin Code
            </label>
            <input
              type="number"
              className="form-control"
              id="pin"
              name="pin"
              value={userData.pin}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
