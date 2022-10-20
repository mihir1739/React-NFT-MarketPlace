import React,{useState, useEffect} from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "../styles/nft-details.css";

import {avas} from "../assets/data/data"
import {getSaleFromId, buy} from "../helper_functions/salehandler"
import {bid, end_auction} from '../helper_functions/auctions'


const MIN_BID_INCREMENT = 0.01;

const NftDetails = (props) => {
  // redirection if transaction is successful
  const urlParams = new URLSearchParams(window.location.search);
  const txhash = urlParams.get("transactionHashes")
  if(txhash !== null){
    // Show a congratulatory message for the successful transaction here 
    window.location.href = '../../React-NFT-Website-main#/market'
  }

  const {wallet, marketplaceContract, accountId} = props.mainObject;
  const { nftContract, tokenId } = useParams();
  const [sale, setSale] = useState();
  const [title, setTitle] = useState('');
  const [priceToDisplay, setPriceToDisplay] = useState('');
  const [creatorImg, setCreatorImg] = useState(avas[Math.floor(Math.random() * 6)]);
  const [imgUrl, setImgUrl] = useState('');
  const [isAuction, setIsAuction] = useState(false);
  const [owner_id, setOwner] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(()=>{
    async function fetchObject(){
      const object = await getSaleFromId(wallet, marketplaceContract, nftContract, tokenId);
      setRelevantStuff(object.sale, object.token);
    }
    fetchObject()
  },[])

  const setRelevantStuff = (sale, token) =>{
    setSale(sale);
    setIsAuction(sale.is_auction);
    setTitle(token.metadata.title);

    setPriceToDisplay( (sale.price/(10**24)).toFixed(2) );
    if (sale.bids && sale.bids.length!=0){
      console.log(sale.bids)
      setPriceToDisplay( (sale.bids[0].price/(10**24)).toFixed(2) );
      // Name of the latest bidder can also be obtained by bids[0].bidder_id
    }
    
    setImgUrl(token.metadata.media);

    if(token.base_uri){
      setImgUrl(token.base_uri + '/' + token.metadata.media);
    }
    setOwner(sale.owner_id);
    setDesc(token.metadata.description);
  }

  const buyButtonListener = ()=>{
     buy(wallet, marketplaceContract, accountId, tokenId, sale);
  }

  const bidListener = () =>{
    let bid_amount = document.querySelector('#bid_amount').value;
    if(!bid_amount)
      bid_amount = 0;
    
    bid(wallet, marketplaceContract, accountId, sale, bid_amount, priceToDisplay)
  }

  const endAuctionListener = () =>{
    console.log('bruh');
    end_auction(sale, wallet, marketplaceContract)
  }

  return (
    <>
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={imgUrl}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <img src={creatorImg} alt="" className="w-100" />
                  </div>

                  <div className="creator__detail">
                    <p>Created By</p>
                    <h6>{owner_id}</h6>
                  </div>
                </div>

                <p className="my-4">{desc}</p>

                {/*Depending on if its an auction or not, either the buy button should be shown or the input, bid, endAuction button */}
                { !isAuction 
                  ? 
                  <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={buyButtonListener}>
                    <i className="ri-shopping-bag-line"></i>
                    Buy for {priceToDisplay} NEAR
                  </button>
                  :
                  <div>
                    <div className="input__item mb-4">
                      <input type="number" id="bid_amount" min={parseFloat(priceToDisplay)+MIN_BID_INCREMENT} step={0.01} placeholder="00 . 00 NEAR" />
                    </div>
                    <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={bidListener}>
                      <i className="ri-shopping-bag-line"></i>
                      Bid
                    </button>
                    <button className="singleNft-btn d-flex align-items-center gap-2 w-100" onClick={endAuctionListener}>
                      <i className="ri-shopping-bag-line"></i>
                      End_Auction
                    </button>
                  </div>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NftDetails;
