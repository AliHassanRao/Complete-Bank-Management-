import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const [auth, setAuth] = useAuth();

  useEffect(() => {}, [auth]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light container">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {!auth.user ? (
            <></>
            ) : (
              <>
                {auth.user.role === 1 && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active">
                        Global_Bank
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/allpost">
                        All Customers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/create">
                        Create Account
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/bankServices">
                        Bank Services
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <h5 className="nav-link active" style={{ fontWeight: "bold",textTransform:"uppercase"}}>{auth.user.name}</h5>
                </li>
                <>
                  {" "}
                  {auth.user.role === 0 && (
                    <li className="nav-item">
                      <Link className="nav-link active" to="/services">
                        ATM Services
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      onClick={handleLogout}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
