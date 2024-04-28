import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function StaticExample({ data }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  const handleConfirm = async () => {
    try {
      // Transfer funds
      await axios.put("http://localhost:5000/fundtransfer", {
        accountno: data.sender.accountno,
        pin: data.sender.pin,
        amount: data.amount,
        ndAccount: data.receiver.accountno,
      });

      // Create statement for sender
      await axios.post("http://localhost:5000/createstatement", {
        bankuser: auth.user._id,
        credit: data.amount,
        name: data.receiver.name,
        accountno: data.receiver.accountno,
      });

      // Create statement for receiver
      await axios.post("http://localhost:5000/createstatement", {
        bankuser: data.receiver._id,
        debit: data.amount,
        name: data.sender.name,
        accountno: data.sender.accountno,
      });

      navigate("/allpost");
    } catch (error) {
      setError("Error transferring funds. Please try again later.");
      console.error("Error transferring funds:", error.message);
    }
  };

  return (
    <div>
      <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Press Confirm to transfer Rs.{data.amount}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Customer</th>
                <th scope="col">Name</th>
                <th scope="col">Account No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sender</th>
                <td>{data.sender.name}</td>
                <td>{data.sender.accountno}</td>
              </tr>
              <tr>
                <th scope="row">Receiver</th>
                <td>{data.receiver.name}</td>
                <td>{data.receiver.accountno}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>

        <Modal.Footer>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StaticExample;
