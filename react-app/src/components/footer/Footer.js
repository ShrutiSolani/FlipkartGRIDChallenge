import React from "react";
import { MDBFooter } from "mdbreact";
import "./Footer.css";

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="">
          Ishika
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
