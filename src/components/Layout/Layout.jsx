import React from "react";
import Routers from "../../routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  
  const {accountId} = props.mainObject;

  return (
    <div>
      <Header accountId={accountId}/>
      <div>
        <Routers mainObject={props.mainObject}/>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;