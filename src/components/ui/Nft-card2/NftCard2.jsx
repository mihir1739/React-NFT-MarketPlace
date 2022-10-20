import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card2.css";

import {avas} from "../../../assets/data/data"
import Modal2 from "../Modal2/Modal2";

const NftCard2 = (props) => {
  let { token_id, nft_contract_id, price, bids, owner_id, start_time, end_time } =  props.auction;

  const token = props.token;
  const title = token.metadata.title;

  // Changing background colour on the basis of auction validity
  let colour = 'green';
  let startTime = start_time/(10**6);
  let endTime = end_time/(10**6);
  let currentTime = (new Date).getTime()
  if(currentTime < startTime){
    colour = 'grey'
  }

  if(currentTime > endTime){
    colour = 'red';
  }

  // Price to display depends on if there are bids or not
  let preface = 'Current Price'
  let priceToDisplay = (price/(10**24)).toFixed(2);
  let currentBidder;
  if (bids.length!==0){
    priceToDisplay = (bids[0].price/(10**24)).toFixed(2);
    price = bids[0].price/(10**24);
    currentBidder = bids[0].bidder_id;
    preface='Latest Bid';
  }

  // Handling Img URL (whether its an image link or through the ipfs gateway(base_uri) )
  let imgUrl = token.metadata.media;
 
  if(token.base_uri){
    imgUrl = token.base_uri + '/' + token.metadata.media;
  }

  const id = nft_contract_id + '/' + token_id;
  const creatorImg = avas[Math.floor(Math.random() * 6)];

  const [showModal2, setShowModal2] = useState(false);

  return (
    <div className="single__nft__card" style={{backgroundColor : colour}}>
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/auction/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{owner_id}</p>
            </div>

            <div>
              <h6>{preface}</h6>
              <p>{priceToDisplay} NEAR</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal2(true)}
          >
            <i className="ri-shopping-bag-line"></i> Details
          </button>

          {showModal2 && <Modal2 setShowModal2={setShowModal2} nftProps={{price, priceToDisplay, auction : props.auction, title, imgUrl, currentBidder, near : props.near}}/>}
        </div>
      </div>
    </div>
  );
};

export default NftCard2;
