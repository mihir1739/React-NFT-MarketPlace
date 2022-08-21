import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
 import "../styles/storage.css"
import { Container, Row, Col } from "reactstrap";

const Storage = () => {
    return (
        <>
      <CommonSection title="STORAGE" />
      <section>
        <Container>
          <Row>
            <Col lg="10" md="10" className="m-auto text-align">
              <h2>Balance</h2>
              <p>0.00 NEAR out of which 0.00 NEAR is locked in sales.</p>
            <div className="input__item mb-4">
              <h6>DEPOSIT</h6>
               <input type="number" placeholder="Storage deposit in NEAR" />
            </div>
              <button className="place__bid-btn">SUBMIT</button>
              <h2>Withdraw</h2>
              <p>Click on the button below to withdraw your current storage balance</p>
              <button className="place__bid-btn">WITHDRAW</button>
              </Col>
          </Row>
        </Container>
      </section>
    </>
    );
};

export default Storage;