import "bootstrap/dist/css/bootstrap.min.css";
import CommonSection from "../components/ui/Common-section/CommonSection";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { initContract } from "../near/utils.js";
import React from "react";
import "../styles/MyTokens.css";
import { Contract } from "near-api-js";

function Mytokens() {
  const [nftMetadatas, setnftMetadatas] = useState([]);

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
        <div className="container mx-auto mt-3">
          {nftMetadatas.length > 0 ? (
            nftMetadatas.map((nft, key) => {
              return (
                <img
                  style={{ width: "10vw" }}
                  src={getImg(nft.metadata.media)}
                  alt=""
                  key={key}
                />
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
