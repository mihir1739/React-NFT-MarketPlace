import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import "../styles/storage.css"
import { Container, Row, Col } from "reactstrap";
import {giveBalance, deposit_storage, withdraw_storage} from "../helper_functions/storage"
import {useState, useEffect} from "react"

const Storage = (props) => {

    const {marketplaceContract, accountId} = props.mainObject;
    const [balance, setBalance] = useState({})
    useEffect( ()=>{
      async function fetchBalance(){
        setBalance( await giveBalance(marketplaceContract,accountId) )
      }
      fetchBalance()
    })
    
    const submit = () => {
      const amount = parseFloat(document.getElementById('storage_amount').value);
      deposit_storage(marketplaceContract, amount);
    }

    const withdraw = () =>{
      withdraw_storage(marketplaceContract)
    }

    return (
        <>
      <CommonSection title="STORAGE" />
      <section>
        <Container>
          <Row>
            <Col lg="10" md="10" className="m-auto text-align">
              <h2>Balance</h2>
              <p>{balance.total} out of which {balance.locked} NEAR is locked in sales.</p>
            <div className="input__item mb-4">
              <h2>Deposit </h2>
              <input id="storage_amount" type="number" min="0.01" step="0.01" placeholder="Storage deposit in NEAR" />
              <button className="place__bid-btn" onClick={submit}>SUBMIT</button>
            </div>
              <h2>Withdraw</h2>
              <p>Click on the button below to withdraw your current storage balance</p>
              <button className="place__bid-btn" onClick={withdraw}>WITHDRAW</button>
              </Col>
          </Row>
        </Container>
      </section>
    </>
    );
};

export default Storage;