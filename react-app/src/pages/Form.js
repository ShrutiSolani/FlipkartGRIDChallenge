import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Form, Button } from "react-bootstrap";
import Footer from "../components/footer/Footer";

const Forms = () => {
  return (
    <>
      <Navbar />
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I Accept the Terms & Conditions" />
        </Form.Group>
        <Button variant="primary" type="submit">
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="http://localhost:8080/"
          >
            Sign Up
          </a>
        </Button>
      </Form>
      <Footer />
    </>
  );
};

export default Forms;
