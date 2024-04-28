import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountno, setAccountno] = useState("");
  const [balance, setBalance] = useState("");
  const [pin, setPin] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      const user = response.data.updateUser;
      setPhone(user.phone);
      setName(user.name);
      setEmail(user.email);
      setAccountno(user.accountno);
      setBalance(user.balance);
      setPin(user.pin);
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/user/${id}`, { name, email, phone, accountno, balance, pin });
      navigate('/allpost');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <Layout>
<div className="container mt-5">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Account No</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={accountno}
            onChange={(e) => setAccountno(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Balance</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pin</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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

export default Update;
