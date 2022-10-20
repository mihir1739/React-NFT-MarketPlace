import React,{useState, useEffect} from "react";

import HeroSection from "../components/ui/HeroSection";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";

import {getSales, getAuctions} from "../helper_functions/salehandler"

const Home = (props) => {
  const {wallet, marketplaceContract, accountId} = props.mainObject;

  const [auctions, setAuctions] = useState([]);
  const [aucTokens, setAucTokens] = useState([]);
  const [sales, setSales] = useState([]);
  const [saleTokens, setSaleTokens] = useState([]);

  useEffect( ()=>{
    async function fetchObjects(){
      const object1 = await getSales(wallet, marketplaceContract, 0, 4);
      setSales(object1.sales);
      setSaleTokens(object1.tokens);
      const object2 = await getAuctions(wallet, marketplaceContract, 0, 4);
      setAuctions(object2.auctions);
      setAucTokens(object2.tokens);
    }
    fetchObjects()
  },[]);  

  return (
    <>
      <HeroSection />
      <LiveAuction near={{wallet, marketplaceContract, accountId}} tokens={aucTokens} auctions={auctions}/>
      <SellerSection />
      <Trending near={{wallet, marketplaceContract, accountId}} tokens={saleTokens} sales={sales}/>
      <StepSection />
    </>
  );
};

export default Home;
