import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

const wallet__data = [
  // {
  //   title: "Near Wallet",
  //   desc: "Best software cryptowallet that allows you to store both NFTs and as well as Crypto currencies. Provides security to your asset!!",
  //   icon: "ri-bit-coin-line",
  // },

  // {
  //   title: "Near Wallet",
  //   desc: "Best software cryptowallet that allows you to store both NFTs and as well as Crypto currencies. Provides security to your asset!!",
  //   icon: "ri-coin-line",
  // },

  {
    title: "Near Wallet",
    desc: "Best software cryptowallet that allows you to store both NFTs and as well as Crypto currencies. Provides security to your asset!!",
    icon: "ri-coin-line",
  },

  // {
  //   title: "CoinBase",
  //   desc: "Best software cryptowallet that allows you to store both NFTs and as well as Crypto currencies. Provides security to your asset!!",
  //   icon: "ri-bit-coin-line",
  // },
];

const Wallet = () => {
  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  Ignitus suggest's you the best crypto wallets in the market. 
                  Wallets provides best security to all your assets and also allows you 
                  to store you NFTs or Tokens safe with a keys!
                </p>
              </div>
            </Col>

            {wallet__data.map((item, index) => (
              <Col lg="12" md="6" sm="4" key={index} className="mb-6">
                <div className="wallet__item">
                  <span>
                    <i class={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
