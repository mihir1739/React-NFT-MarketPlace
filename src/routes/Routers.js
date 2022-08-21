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

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/auction" element={<Auction />} />
      <Route path="/create" element={<Create />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mytokens" element={<MyTokens />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/market/:id" element={<NftDetails />} />
      <Route path="/auction/:id" element={<NftDetails />} />

    </Routes>
  );
};

export default Routers;
