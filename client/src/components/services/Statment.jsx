import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout";
import { useAuth } from "../../context/auth";

const Statement = () => {
  const [users, setUsers] = useState([]);
  const [auth ] = useAuth(); 

  useEffect(() => {
    const fetchAllStatements = async () => {
      try {
  
        if (!auth || !auth.user) {
          console.log("Authentication information not available yet.");
          return;
        }

        const bankuser = auth.user._id;
        const response = await axios.post("http://localhost:5000/statement", { bankuser: bankuser });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (auth && auth.user) {
      fetchAllStatements();
    }
  }, [auth]); 

  return (
    <Layout>
      <div className="container my-3">
        <h2 className="text-center my-4">Your Bank Statement</h2>
        <table className="table my-4">
          <thead>
            <tr>
              <th scope="col">Sr#</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{new Date(user.date).toLocaleString()}</td>
                <td>
                  {user.name || user.accountno ? (
                    `${user.name}__Acc#:${user.accountno}`
                  ) : user.credit ? (
                    <span style={{ color: "red" }}>Credit</span>
                  ) : user.debit ? (
                    <span>Debit</span>
                  ) : null}
                </td>
                <td>
                  {user.credit ? (
                    <span style={{ color: "red" }}>-{user.credit}</span>
                  ) : user.debit ? (
                    <span>{user.debit}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Statement;
