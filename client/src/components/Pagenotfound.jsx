import React from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  const centerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 100px)",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "6rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#555",
  };

  const btnStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  return (
    
    <div style={centerStyle}>
      <h1 style={titleStyle}>404</h1>
      <h2 style={headingStyle}>Oops! Page Not Found</h2>
      <Link to="/" style={btnStyle}>
        Go Back
      </Link>
    </div>
  );
};

export default Pagenotfound;
