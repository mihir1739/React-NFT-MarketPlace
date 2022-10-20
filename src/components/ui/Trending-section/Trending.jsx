import React from "react";
import { Container, Row, Col } from "reactstrap";

import "./trending.css";
import { v4 as uuidv4 } from 'uuid';

import NftCard from "../Nft-card/NftCard";

const Trending = (props) => {

  const {near, tokens, sales} = props;

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">For Sale</h3>
          </Col>

          {tokens.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4" key={uuidv4()}>
              <NftCard sale={sales[tokens.indexOf(item)]} token={item} near={near}/>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
