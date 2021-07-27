import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AnchorLink = styled(Link)`
  text-decoration: none;
  color: white;
  :hover {
    color: white;
    text-decoration: none;
  }
`;

const NavBar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="sm">
      <Navbar.Brand>
        <AnchorLink to="/">Death Star II</AnchorLink>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
