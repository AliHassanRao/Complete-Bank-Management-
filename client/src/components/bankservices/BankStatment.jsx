import React, { useState } from "react";
import axios from "axios";
import Layout from "../Layout";

const Statement = () => {
  const [accountno, setAccountno] = useState("");
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState();

  const fetchAllStatements = async () => {
    try {
      const res = await axios.post("http://localhost:5000/accounttitle", {
        accountno: parseInt(accountno),
      });
      setInfo(res.data);
      console.log(res.data);
      const bankuser = res.data.id;
      const response = await axios.post("http://localhost:5000/statement", {
        bankuser: bankuser,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Layout>
      <div className="container my-3">
        <h2 className="text-center my-4">Bank Statement</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="accountNoInput">Enter Account No</label>
              <input
      placeholder="Enter Account No"
      id="accountNoInput"
      className="form-control"
      type="number"
      style={{ fontSize: "1.2em" }}
      value={accountno}
      onChange={(e) => setAccountno(e.target.value)}
    />
      

            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={fetchAllStatements}
              >
                Get Statement
              </button>
            </div>
          </div>
        </div>
        {users && users.length > 0 && (
          <>
            <div
              
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <h5>Account Title: {info.name}</h5>
              <h5>Account No: {info.accountno}</h5>
            </div>

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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Statement;
