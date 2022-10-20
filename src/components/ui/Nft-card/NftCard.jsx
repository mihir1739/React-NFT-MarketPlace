import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import {avas} from "../../../assets/data/data"
import Modal from "../Modal/Modal";

const NftCard = (props) => {
  const { token_id, nft_contract_id, price, owner_id } =  props.sale;

  const token = props.token;
  const title = token.metadata.title;
  const priceToDisplay = (price/(10**24)).toFixed(1);

  let imgUrl = token.metadata.media;

  if(token.base_uri){
    imgUrl = token.base_uri + '/' + token.metadata.media;
  }

  const id = nft_contract_id + '/' + token_id;
  const creatorImg = avas[Math.floor(Math.random() * 6)];

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
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
              <h6>Price</h6>
              <p>{priceToDisplay}</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i className="ri-shopping-bag-line"></i> BUY NOW
          </button>

          {showModal && <Modal setShowModal={setShowModal} nftProps={{price, priceToDisplay, sale : props.sale, title, imgUrl, near : props.near}}/>}

          <span className="history__link">
            {/* <Link to="#">View History</Link> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
