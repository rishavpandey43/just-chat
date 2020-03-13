import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Brand>
          <Link to="/">Just Chat</Link>
        </Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default Header;
