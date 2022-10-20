import React from "react";
import {buy} from "../../../helper_functions/salehandler"
// import "./modal.css";

const Modal = ({ setShowModal, nftProps}) => {

  const {title, imgUrl, priceToDisplay, near, sale} = nftProps;
  // If needed, the img can also be shown in the modal with src as imgUrl

  const buyButtonListener = ()=>{
     buy(near.wallet, near.marketplaceContract, near.accountId, sale.token_id, sale);
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Buy Your NFT</h6>
        <p className="text-center text-light">
          {title}
        </p>

        {/* <div className="input__item mb-4">
          <input type="number" placeholder="00 : 00 NEAR" />
        </div> */}

       <div className=" d-flex align-items-center justify-content-between">
          <p>You must BUY at price</p>
          <span className="money">{priceToDisplay}</span>
        </div>
        
        {
          // Can add additional things here if there's a need
        }

        <button className="place__bid-btn" onClick={buyButtonListener}>BUY NOW</button>
      </div>
    </div>
  );
};

export default Modal;
