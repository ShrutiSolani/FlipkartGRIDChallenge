import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "../components/Men1";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Men1 = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 15 }}
      >
        <Row>
          <Col>
            <Canvas
              camera={{ position: [2, 0, 12.25], fov: 15 }}
              style={{
                backgroundColor: "#047BD5",
                width: "58vw",
                height: "90vh",
                zoom: "120%",
                overflow: "hidden",
              }}
            >
              <ambientLight intensity={1.25} />
              <ambientLight intensity={0.1} />
              <directionalLight intensity={0.4} />
              <Suspense fallback={null}>
                <Model position={[0.025, -0.9, 0]} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </Col>
          <Col>
            <br></br>
            <p
              class="product-detail-name m-text16 p-b-13"
              style={{ fontSize: "22px" }}
            >
              Men Winter Hoodie
            </p>

            <h4>
              <p class="m-text8 p-b-13">₹ 799</p>
            </h4>

            <div class="flex-m flex-w p-b-10">
              <div
                class="s-text15 w-size15 t-center"
                style={{ fontSize: "18px", paddingBottom: "5px" }}
              >
                Size
              </div>

              <div class="rs2-select2 rs3-select2 w-size12">
                <select
                  class="form-control"
                  name="size"
                  style={{ width: "25vw" }}
                >
                  <option>Choose an option </option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              <br></br>
            </div>
            <div class="flex-m flex-w">
              <div
                class="s-text15 w-size15 t-center"
                style={{ fontSize: "18px", paddingBottom: "5px" }}
              >
                Color
              </div>

              <div class="rs2-select2 rs3-select2 w-size16">
                <select
                  class="form-control"
                  name="color"
                  style={{ width: "25vw" }}
                >
                  <option>
                    Choose an option <i class="fa fa-caret-down"></i>
                  </option>
                  <option>Gray</option>
                  <option>Red</option>
                  <option>Black</option>
                  <option>Blue</option>
                </select>
              </div>
              <br></br>
            </div>
            <div
              class="s-text15 w-size15 t-center"
              style={{ fontSize: "18px", paddingBottom: "5px" }}
            >
              Details
            </div>
            <Table bordered style={{ width: "25vw" }}>
              <tbody>
                <tr>
                  <td>
                    <b>Material</b>
                  </td>
                  <td>Cotton</td>
                </tr>
                <tr>
                  <td>
                    <b>Stretchiness </b>
                  </td>
                  <td>Moderate Stretch</td>
                </tr>
                <tr>
                  <td>
                    <b>Lining</b>
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <b>Decoration</b>
                  </td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <b>Pattern</b>
                  </td>
                  <td>Solid</td>
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
};

export default Men1;
