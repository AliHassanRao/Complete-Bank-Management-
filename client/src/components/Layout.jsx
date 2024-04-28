import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainStyle = {
    flex: "1",
  };

  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
