import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

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
    desc: "Currently supported wallet which stores your assets",
    icon: "ri-coin-line",
  },

  // {
  //   title: "CoinBase",
  //   desc: "Best software cryptowallet that allows you to store both NFTs and as well as Crypto currencies. Provides security to your asset!!",
  //   icon: "ri-bit-coin-line",
  // },
];

const Wallet = (props) => {

  const {signIn, signOut, wallet, accountId} = props.mainObject;

  const state = wallet.isSignedIn();

  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            {wallet__data.map((item, index) => (
              <Col lg="12" md="6" sm="4" key={uuidv4()} className="mb-6">
                <div className="wallet__item" onClick={state ? signOut : signIn}>
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                  <p>{state ? "You are logged in as " + accountId + ", click to log out" : "You are logged out, click to log in"}</p>
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
