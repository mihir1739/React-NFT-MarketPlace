import React from "react";
import "./preview-mint.css";

const PreviewMint = (props) => {
  const { title, src, creator} = props.item;

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={src} alt="Your upload" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">{title}</h5>

        <div className="creator__info-wrapper d-flex gap-3">

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default PreviewMint;
