import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import { initContract} from './near/utils'

window.nearInitPromise = initContract()
    .then(({ nft_contract, marketplace_contract, accountId, nearConfig, walletConnection }) => {
        ReactDOM.render(
            <React.StrictMode>
                <Router>
                    <App
                        nftContract={nft_contract}
                        marketplaceContract={marketplace_contract}
                        accountId={accountId}
                        nearConfig={nearConfig}
                        wallet={walletConnection}
                    />,
                </Router>
            </React.StrictMode>,
        document.getElementById('root')
        );
    }
);