import "bootstrap/dist/css/bootstrap.min.css";
import CommonSection from "../components/ui/Common-section/CommonSection";
import { useEffect, useState, useRef } from "react";
import { initContract } from "../near/utils.js";
import React from "react";
import "../styles/MyTokens.css";
import { Contract } from "near-api-js";
import { v4 as uuidv4 } from 'uuid';


function Mytokens(props) {
  const {signIn, signOut, wallet, accountId} = props.mainObject;
  const [nftMetadatas, setnftMetadatas] = useState([]);
  useEffect(() => {
    query();
  }, []);

  // const {accountId} = props;

  async function query() {
    const jsonData = [];
    let contracts = [
      "dev-1654679960818-32346456826161",
      "dev-1654158872994-43526873072091",
      "dev-1653362742618-42287399483761",
      "dev-1652185815615-38783641891685",
      "royalties.evin.testnet",
      "dev-1646240406152-71422260461975",
    ];
    const helpers = await initContract();

    contracts.forEach(async (address) => {
      const nft_contract = new Contract(
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

      const nfts = await nft_contract.nft_tokens_for_owner({
        account_id : accountId,
        from_index: "0",
        limit: 10,
      });
      if (nfts.length > 0) {
        console.log(nfts);
        console.log(accountId);
        jsonData.push(...nfts);
        // setnftMetadatas([...nftMetadatas, ...nfts]);
      }

      setnftMetadatas([...nftMetadatas, ...jsonData]);
    });
  }

  return (
    <>
      <CommonSection title="Select collection for viewing your tokens" />
      <section>
        <h2 style={{ textAlign: "center" }}>
          Found "{nftMetadatas.length}" NFTs in your wallet:
        </h2>
        <div className="container mx-auto mt-3">
          {nftMetadatas.length > 0 ? (
            nftMetadatas.map((nft, key) => {
              return (
                <img
                  style={{ width: "10vw" }}
                  src={nft.metadata.media}
                  alt=""
                  key={key}
                />
              );
            })
          ) : (
            <h3 style={{ color: "white" }}>No NFTs found</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Mytokens;
