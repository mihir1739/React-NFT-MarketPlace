import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import "./step-section.css";

const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "Setup up your wallet to buy or sell NFTs with best price. Soon other connect wallet  option will be added ",
    icon: "ri-wallet-line",
  },

  {
    title: "Create your collection",
    desc: "You can buy all our rare collections of NFTs and add it into your collection, place bids to purchase the NFTs ",
    icon: "ri-layout-masonry-line",
  },

  {
    title: "Add your NFTs",
    desc: "Add your NFTs on our site and fix a price for buying, sell your own NFTs in the best market price ever ",
    icon: "ri-image-line",
  },

  {
    title: "List them for sale",
    desc: "You can put your collected NFTs and list them for sale, without much hasel you can transfer the ownership ",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={uuidv4()} className="mb-4">
              <div className="single__step__item">
                <span>
                  <i className={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link to="/wallet">{item.title}</Link>
                  </h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
