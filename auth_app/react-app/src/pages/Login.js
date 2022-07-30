import React, { useState } from "react";
import { LoadingManager } from "three";
import Header from "../components/navbar/Navbar";
import "./login.css"
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
export default function (props) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email/Mobile Number</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="http://localhost:8080/"
                  >
                    Login
                  </a>
                </button>
              </div>
              <p className="mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div>
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            
            <div style={{float:"left"}} className="form-group mt-3">
            <Container fluid style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 15}}>

              <Row>
                <Col>
                <label>City</label>
              <input
                type="text" 
                className="form-control mt-2"
                placeholder="City" 
              />
                </Col>
                <Col>
                <label>State</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="State" 
              />
              </Col>
              </Row>
            </Container>
            </div>
            
            <div className="form-group mt-3">
              <label>Select Gender</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Avatar Image</label>
              <input
                type="file"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="http://localhost:8080/"
                >
                  Signup
                </a>
              </button>
            </div>
            <p className="mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
