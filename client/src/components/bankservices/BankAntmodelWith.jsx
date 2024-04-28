import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function StaticExample({ data, title }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  const handleConfirm = async () => {
     
      try {
    
        await axios.put("http://localhost:5000/cashwithdrawal", {
          accountno: parseInt(data.accountno),
          pin: parseInt(data.pin),
          newBalance: parseInt(data.creditAmount),
        });
    
        // Create statement for receiver
        await axios.post("http://localhost:5000/createstatement", {
          bankuser: title.id,
          credit: parseInt(data.creditAmount),
          name: title.name,
          accountno: parseInt(data.accountno),
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
          <Modal.Title>Press Confirm to Credit Rs.{data.creditAmount}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Account Title</th>
                <th scope="col">Account No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{title && title.name}</th> {/* Check if title is defined */}
                <td>{data.accountno}</td>
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
