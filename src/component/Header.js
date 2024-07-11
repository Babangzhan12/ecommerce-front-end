import React from "react";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="header shadow-1">
      <div className="flex">
        <div className="flex-grow">
          <h1>e-commerce</h1>
        </div>
        <div className="flex-none">
          {user.role === "user" && (
            <div className="user-info">
              <Link to="/user/profile" className="profile">
                {user.nama}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
