import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Auction from "../pages/Auction";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Storage from "../pages/Storage";
import Terms from "../pages/Terms";
import MyTokens from "../pages/MyTokens";

import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";

const Routers = (props) => {

  const {mainObject} = props;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home mainObject={mainObject}/>} />
      <Route path="/market" element={<Market mainObject={mainObject}/>} />
      <Route path="/auction" element={<Auction mainObject={mainObject}/>} />
      <Route path="/create" element={<Create mainObject={mainObject}/>} />
      <Route path="/storage" element={<Storage mainObject={mainObject}/>} />
      <Route path="/terms" element={<Terms mainObject={mainObject}/>} />
      <Route path="/contact" element={<Contact mainObject={mainObject}/>} />
      <Route path="/mytokens" element={<MyTokens mainObject={mainObject}/>} />
      <Route path="/wallet" element={<Wallet mainObject={mainObject}/>} />
      <Route path="/market/:nftContract/:tokenId" element={<NftDetails mainObject={mainObject}/>} />
      <Route path="/auction/:nftContract/:tokenId" element={<NftDetails mainObject={mainObject}/>} />

    </Routes>
  );
};

export default Routers;
