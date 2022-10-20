import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import {getSales} from "../helper_functions/salehandler"

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const Market = (props) => {

  const {wallet, marketplaceContract, accountId} = props.mainObject;

  const [sales, setSales] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect( ()=>{
    async function fetchObject(){
      const object = await getSales(wallet, marketplaceContract);
      setSales(object.sales);
      setTokens(object.tokens);
    }
    fetchObject()
  },[]);  

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    // Something that can be done later
    /*
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
    */
  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

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
                <NftCard sale={sales[tokens.indexOf(item)]} token={item} near={{wallet, marketplaceContract, accountId}}/>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;

/*

{tokens.map((item)=>{ return (<h1>{item.token_id}</h1>)}) }
/*

  const data = sales.map(sale =>
    sale.reduce(
      (result, field, index) => ({ ...result, [tokens[index]]: field }),
      {}
    )
  )
*/
