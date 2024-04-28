import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import { useAuth } from "../context/auth";
const Read = () => {
  const [users, setUsers] = useState([]);
const [auth, setAuth] = useAuth();
  const [duser,setDuser] = useState("");
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();


  // Function to fetch all users from the server
  const allUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete user
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      const deletedUser = response.data.deletedUser;
  
      // Check if the deleted user is the currently authenticated user
      if (auth.user._id === deletedUser._id) {
        localStorage.removeItem("auth");
        setAuth(""); 
      }
  
      // Delete related statements
      await axios.delete("http://localhost:5000/statement", {
        data: { bankuser: id },
      });
  
      // Update the user list
      allUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <Layout>
      <div className="container my-3">
        <h2 className="text-center my-4">All Bank Customers Are Here</h2>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
      <h5 style={{ fontWeight: "bold"}}>Account Type: {auth.user.name === 'Admin' ? (<span style={{ fontWeight: "bold",textTransform:"uppercase"}}>
          Admin
        </span>) : (<h5>User</h5>)}</h5>
        <h5> <div className="App">
            <h5 style={{ fontWeight: "bold"}} align="center">Current Time</h5>
            <h6 align="center"> {showTime}</h6>
        </div></h5>
      <h5 style={{ fontWeight: "bold"}}>Name: {auth.user.name}</h5>
    </div>




        <table className="table  my-4">
          <thead>
            <tr>
              <th scope="col">Sr#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone#</th>
              <th scope="col">Account#</th>
              <th scope="col">Balance</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
  {users
    .filter(user => user.name !== 'Admin') // Filter out users with name 'Admin'
    .map((user, index) => (
      <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.accountno}</td>
        <td>{user.balance}</td>
        <td>
          <Link
            onClick={() => {
              handleDelete(user._id);
            }}
            className="card-link"
          >
            Delete
          </Link>
        </td>
        <td>
          <Link to={`/update/${user._id}`} className="card-link ml-2">
            Update
          </Link>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
    </Layout>
  );
};

export default Read;
