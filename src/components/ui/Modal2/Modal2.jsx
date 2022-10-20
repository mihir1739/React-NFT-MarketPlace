import React from "react";

import "./modal2.css";
import {bid, end_auction} from '../../../helper_functions/auctions'

const Modal2 = ({nftProps, setShowModal2 }) => {

  const {title, imgUrl, priceToDisplay, near, auction, currentBidder} = nftProps;
  const MINIMUM_BID_AMOUNT = 0.01;

  // Converting dates to readable format
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  let startTime = auction.start_time/(10**6)
  startTime = (new Date(startTime)).toLocaleString("en-UK");

  let endTime = auction.end_time/(10**6)
  endTime = new Date(endTime).toLocaleString("en-UK");

  const bidListener = () =>{
    let bid_amount = document.querySelector('#bid_amount').value;
    if(!bid_amount)
      bid_amount = 0;
    
    bid(near.wallet, near.marketplaceContract, near.accountId, auction, bid_amount, priceToDisplay)
  }

  const endAuctionListener = () =>{
    console.log('bruh');
    end_auction(auction, near.wallet, near.marketplaceContract)
  }

  const minNextBid = parseFloat(priceToDisplay) + MINIMUM_BID_AMOUNT;
  
  return ( 
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal2(false)}></i>
        </span>
        <h6 className="text-center text-light">Place a Bid</h6>
        <p className="text-center text-light">
          You must bid atleast <span className="money">{minNextBid}</span>
        </p>

        <div className="input__item mb-4">
          <input type="number" id="bid_amount" min={minNextBid} step={0.01} placeholder="00 . 00 NEAR" />
        </div>
        
        <div className=" d-flex align-items-center justify-content-between">
          <p>{currentBidder ? "Latest Bidder" : "Owner"}</p>
          <p>{currentBidder ? currentBidder : auction.owner_id}</p>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Start Time</p>
          <p>{startTime}</p>
        </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>End Time</p>
          <p>{endTime}</p>
        </div>

        <button className="place__bid-btn" onClick={bidListener}>Place a Bid</button>
        <button className="place__bid-btn" onClick={endAuctionListener}>End Auction</button>
        
      </div>
    </div>
  );
};

export default Modal2;
