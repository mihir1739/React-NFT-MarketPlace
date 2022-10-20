import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard2 from "../Nft-card2/NftCard2";
import { v4 as uuidv4 } from 'uuid';

import "./live-auction.css";


const LiveAuction = (props) => {

  const {near, tokens, auctions} = props;

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Live Auction</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>


          {tokens.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4" key={uuidv4()}>
              <NftCard2 auction={auctions[tokens.indexOf(item)]} token={item} near={near}/>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
