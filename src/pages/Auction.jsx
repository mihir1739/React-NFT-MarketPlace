import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard2 from "../components/ui/Nft-card2/NftCard2";
import {getAuctions} from "../helper_functions/salehandler"

import { Container, Row, Col } from "reactstrap";

import "../styles/auction.css";

const Auction = (props) => {
  const {wallet, marketplaceContract, accountId} = props.mainObject;

  const [auctions, setAuctions] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect( ()=>{
    async function fetchObject(){
      const object = await getAuctions(wallet, marketplaceContract);
      setAuctions(object.auctions);
      setTokens(object.tokens);
    }
    fetchObject()
  },[]);  

  // Something that can be done later
  const handleSort = (e) =>{
  }

  return (
    <>
      <CommonSection title={"Live Auction"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>
            
            {tokens.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={uuidv4()}>
                <NftCard2 auction={auctions[tokens.indexOf(item)]} token={item} near={{wallet, marketplaceContract, accountId}}/>
              </Col>
            ))}

          </Row>
        </Container>
      </section>
    </>
  );
};

export default Auction;