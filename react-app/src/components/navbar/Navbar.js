import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

const Header = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="flipkart_icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Flipkart
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
