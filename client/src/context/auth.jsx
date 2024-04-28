import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});


  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.user?.token || '';
  }, [auth]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth(parsedData);
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
