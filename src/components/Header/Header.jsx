import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

// import Nav from 'react-bootstrap/Nav';
// import { Link } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';

import { NavLink, Link } from "react-router-dom";

let NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Auction",
    url: "/auction",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Storage",
    url: "/storage",
  },
  {
    display: "T&C",
    url: "/terms",
  },
  {
    display: "Tokens",
    url: "/mytokens",
  },
  // {
  //   display: "Contact",
  //   url: "/contact",
  // },
];

const Header = (props) => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  const listenerFunction = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", listenerFunction);

    return () => {
      window.removeEventListener("scroll", listenerFunction);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  const {accountId} = props;

  if(!accountId){
    NAV__LINKS = NAV__LINKS.filter((item) =>
      (item.display!=="Storage" && item.display!=="Tokens")
    )
  }

  return (
    <header className="header" ref={headerRef}>
      <Container> 
        <div className="navigation"> 
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className=""></i>
              </span>
              IGNITUS NETWORKS
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={uuidv4()}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button className="btn d-flex gap-2 align-items-center">
              <span>
                <i className="ri-wallet-line"> </i>
              </span>
              <Link to="/wallet">{accountId ? accountId : "Connect Wallet"}</Link>
            </button>

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;