import "bootstrap/dist/css/bootstrap.min.css";
import CommonSection from "../components/ui/Common-section/CommonSection";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import InputGroup from "react-bootstrap/InputGroup";
import { useState,useEffect } from "react";
import { initContract } from "../near/utils.js";
import React from "react";
import "../styles/MyTokens.css";
import { Contract } from "near-api-js";
import {giveBalance, deposit_storage, withdraw_storage} from "../helper_functions/storage"
import Popup from '../components/Popup/Popup'
import 'reactjs-popup/dist/index.css';

var a = 0;
const GAS_FEE= `100000000000000`
const NEAR_IN_YOCTO=1000000000000000000000000;
const getNFTSlocal = (t = false) => {
  let nft_data = localStorage.getItem('NFT_Data');
  if (nft_data == null || nft_data == "null" || t) {
    return JSON.parse(localStorage.getItem('NFT_Data'))
  }
  else {
    return [];
  }
}

const today = new Date();
function Mytokens(props) {
  const {marketplaceContract, accountId,nftContract} = props.mainObject;
  const [balance, setBalance] = useState({})
  const [nftMetadatas, setnftMetadatas] = useState(getNFTSlocal());
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let x = 0;
  let sale_price;
  useEffect(() => {
    if (nftMetadatas.length > 0) {
      localStorage.setItem('NFT_Data', JSON.stringify(nftMetadatas))
    }
  }, [nftMetadatas])
  useEffect(() => {
    let s = getNFTSlocal(true);
    setnftMetadatas(s);
    async function fetchBalance(){
      setBalance( await giveBalance(marketplaceContract,accountId) )
    }
    fetchBalance()
  }, [])
  async function handleSubmit(e) {
    e.preventDefault();
    const address = e.target.address.value;
    const helpers = await initContract();
    try {
      const contract = new Contract(
        helpers.walletConnection.account(),
        address,
        {
          viewMethods: [
            "nft_metadata",
            "nft_total_supply",
            "nft_tokens_for_owner",
            "nft_token",
          ],
          changeMethods: [
            "nft_mint",
            "nft_transfer",
            "nft_approve",
            "nft_revoke",
          ],
        }
      );

      const nfts = await contract.nft_tokens_for_owner({
        account_id: helpers.accountId,
        from_index: "0",
        limit: 20,
      });
      setnftMetadatas([...nftMetadatas, ...nfts]);
    } catch {
      alert("Invalid address!");
    }
  }

  function checkIPFSHash(hash) {
    return hash.startsWith("Qm");
  }

  function getImg(url) {
    if (checkIPFSHash(url)) {
      return `https://gateway.pinata.cloud/ipfs/${url}`;
    } else {
      return url;
    }
  }
  async function checkStorage(price)
  {
    try{
      let minimum_balance= await marketplaceContract.storage_minimum_balance()
      let current_storage= await marketplaceContract.storage_balance_of({"account_id":accountId})
      let totalSales = await marketplaceContract.get_supply_by_owner_id({"account_id":accountId})
  
  
      if(current_storage-minimum_balance*totalSales<=minimum_balance){
        alert('Not enough storage. Please visit the Storage section to get storage.')
        return true;
      }
      else{
        return false;
      }
    }
    catch(e)
    {
      alert("Caught an unexpected error")
      console.log(e);
      return false;
    }
  }

  async function makeSale(nft,vp){
    const sale_price=parseFloat(vp.target.price.value);
		if (!sale_price){
			alert("Please fill the fields appropriately.");
			return;
		}

		if(typeof(sale_price)!="number"){
			alert("Sale must be a number")
			return;
		}

		if(await checkStorage(sale_price)){
			return;
		}

		const price=(sale_price*NEAR_IN_YOCTO).toLocaleString('fullwide', {useGrouping:false});
		const is_auction=false;
    const nft_contract_id = marketplaceContract.contractId;
		try {
			await nftContract.nft_approve({"token_id": nft["token_id"],
			                                "account_id":accountId,
			                                "msg":JSON.stringify({price,is_auction,nft_contract_id})},
			                              GAS_FEE,
			                              (NEAR_IN_YOCTO/10).toLocaleString('fullwide', {useGrouping:false}) ) ;
		} catch (e) {
			alert(
			  'Something went wrong! ' +
			  'Maybe you need to sign out and back in? ' +
			  'Check your browser console for more info.'
			)
      console.log(marketplaceContract.offer);
			throw e
		}
  }

  return (
    <>
      <CommonSection title="Select collection for viewing your tokens" />
      <section>
        <div>
          <h3 style={{ color: "white" }}>Add Collection</h3>
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Valid contract Id"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                name="address"
                required
              />
              <Button variant="success" type="submit" id="button-addon2">
                SUBMIT
              </Button>
            </InputGroup>
          </form>
        </div>
        <h2 style={{ textAlign: "center" }}>
          Found "{nftMetadatas.length}" NFTs in your wallet:
        </h2>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          if {nftMetadatas ? (
            nftMetadatas.map((nft, key) => {
              return (
                <div key={a++}>
                <Button
                  onClick={()=>setOpen(true)}
                  style={{
                    backgroundColor: "rgba(0, 0, 255, 0.219)",
                    width: "15vw",
                    margin: "1rem",
                  }}
                >
                  <img
                    style={{ width: "80%", margin: "0.5rem" }}
                    src={getImg(nft.metadata.media)}
                    alt=""
                    key={key}
                  />
                  <h6 style={{ color: "white", wordWrap: "break-word" }}>
                    #
                    <span style={{ color: "GrayText", margin: "0.2rem" }}>
                      {nft.token_id.toUpperCase()}
                    </span>
                  </h6>
                </Button>
                <Popup trigger={open} setTrigger={setOpen}>
                    <div>
                      <h3>Title</h3>
                      <p>NFT21</p>
                      <h3>Description</h3>
                      <p>{nft['metadata']['description']}</p>
                      <h3>List as Sale</h3>
                      <form onSubmit={(vp)=>{makeSale(nft,vp);}}>
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Sale Price"
                            name="price"
                            required
                          />
                          <Button variant="success" type="submit" id="button-addon2">
                            SUBMIT
                          </Button>
                        </InputGroup>
                      </form>
                      <h3>List as auction</h3>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="validationFormik03">
                          <Form.Label>Starting Price</Form.Label>
                              <Form.Control type="text" name="startingPrice" />
                          <Form.Label>Start Date</Form.Label>  
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                            minDate={today}
                            customInput={
                              <input
                                type="text"
                                id="validationCustom01"
                                placeholder="Start Date"
                              />
                            }
                          />
                          <Form.Label>End Date</Form.Label>  
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="form-control"
                            minDate={today}
                            customInput={
                              <input
                                type="text"
                                id="validationCustom01"
                                placeholder="First name"
                              />
                            }
                          />
                        </Form.Group>
                        <button type="submit">
                            Submit
                          </button>
                      </Form>
                    </div>
                </Popup>
                </div>
              );
            })
          ) : (
            <h3 style={{ color: "white", textAlign: "center" }}>
              No NFTs found
            </h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Mytokens;


