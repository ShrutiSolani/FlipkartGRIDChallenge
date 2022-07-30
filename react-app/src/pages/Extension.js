import React, { useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";

const MODEL_UID = "9cb04641558e40dbbee9f61ac55fdcb5";

const Extension = () => {
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
              GymCrew 20/1 double support bench silver colour Multipurpose Fitness Bench
            </p>

            <h4>
              <p class="m-text8 p-b-13">₹ 6,999</p>
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
                    <b>Type</b>
                  </td>
                  <td>Multipurpose Fitness Bench</td>
                </tr>
                <tr>
                  <td>
                    <b>Positioning Type</b>
                  </td>
                  <td>incline, decline, flat</td>
                </tr>
                <tr>
                  <td>
                    <b>Material</b>
                  </td>
                  <td>M S Iron</td>
                </tr>
                <tr>
                  <td>
                    <b>W x H x D</b>
                  </td>
                  <td>47 cm x 126 cm x 28 cm</td>
                </tr>
                <tr>
                  <td>
                    <b>Holding Capacity</b>
                  </td>
                  <td>250 kg</td>
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

    // <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <iframe
    //     // We feed the ref to the iframe component to get the underlying DOM object
    //     ref={viewerIframeRef}
    //     title="sketchfab-viewer"
    //     style={{
    //       height: "100vh",
    //       width: 1500,
    //       flex: "center",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   />
    // </div>
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

export default Extension;
