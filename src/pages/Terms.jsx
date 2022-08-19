import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
// import "./styles/terms.css"
import { Container, Row, Col } from "reactstrap";

const Terms = () => {
    return (
        <>
      <CommonSection title="T&C" />
      <section>
        <Container>
          <Row>
            <Col lg="10" md="10" className="m-auto text-align">
              <h2>TERMS & CONDITIONS</h2>
              <p>1. This website is in public beta and there could be loss of data and digital assets while upgrading.</p>
              <p>2. Income Tax on digital assets in India stand at 30% at the moment. There could be a service tax of 28% also. These amounts will be deducted from the proceeds of any transaction in addition to the royalties which varies from product to product and our commission of 5%.</p>
              </Col>
          </Row>
        </Container>
      </section>
    </>
    );
};

export default Terms;
