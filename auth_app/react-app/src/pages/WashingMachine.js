import React, { useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";

// Our wonderful chair model
const MODEL_UID = "cc7c4ed57dc44576a42e85ca02ce8263";

const WashingMachine = () => {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);

  const ViewerIframe = (
    <div style={{ overflow: "hidden" }}>
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 15 }}
      >
      <Row>
      <Col>
      <iframe
        ref={viewerIframeRef}
        title="sketchfab-viewer"
        style={{
          width: "58vw",
          height: "100vh",
          flex: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      </Col>
      <Col>
            <br></br>
            <p
              class="product-detail-name m-text16 p-b-13"
              style={{ fontSize: "22px" }}
            >
              6 kg 5 Star With Hygiene Steam and Ceramic Heater Fully Automatic Front Load with In-built Heater Silver
            </p>

            <h4>
              <p class="m-text8 p-b-13">₹ 23,990</p>
            </h4>
          
            <div
              class="s-text15 w-size15 t-center"
              style={{ fontSize: "18px", paddingBottom: "5px" }}
            >
              Highlights
            </div>
            <Table bordered style={{ width: "25vw" }}>
              <tbody>
                <tr>
                  <td>
                    <b>Spin speed</b>
                  </td>
                  <td>1000 rpm</td>
                </tr>
                <tr>
                  <td>
                    <b>Rating</b>
                  </td>
                  <td>⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td>
                    <b>Capacity</b>
                  </td>
                  <td>6 kg</td>
                </tr>
                <tr>
                  <td>
                    <b>Motor Warranty</b>
                  </td>
                  <td>10 years</td>
                </tr>
                <tr>
                  <td>
                    <b>Product Warranty</b>
                  </td>
                  <td>3 years</td>
                </tr>
              </tbody>
            </Table>
            <br></br>
            <div style={{ float: "right", marginRight: "40px" }}>
              <button
                style={{
                  backgroundColor: "#FFA500",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  margin: "5px 0px",
                  cursor: "pointer",
                  border: "#FFA500",
                }}
              >
                ADD TO CART
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                style={{
                  backgroundColor: "#DC143C",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  margin: "5px 0px",
                  cursor: "pointer",
                  border: "#FFBF00",
                }}
              >
                BUY NOW
              </button>
            </div>
          </Col>
          </Row>
          </Container>
    </div>
  );

  useEffect(
    () => {
      // Initialize the viewer
      let client = new window.Sketchfab(viewerIframeRef.current);
      client.init(MODEL_UID, {
        success: () => {},
        error: () => {
          console.log("Viewer error");
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []
  );

  return ViewerIframe;
};

export default WashingMachine;
