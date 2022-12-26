import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

// Initialize contract & set variables
const nearConfig = getConfig('development')

export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  const walletConnection = new WalletConnection(near)
  const accountId = walletConnection.getAccountId()


  const nft_contract = new Contract(walletConnection.account(), nearConfig.nftContract, {
    viewMethods: ['nft_metadata', 'nft_total_supply', 'nft_tokens_for_owner', 'nft_token'],
    changeMethods: ['nft_mint', 'nft_transfer', 'nft_approve', 'nft_revoke'],
  })


  //Just to check working on another contract from the same frontend
  const marketplace_contract = new Contract(walletConnection.account(), nearConfig.marketplaceContract, {
    viewMethods: ['get_supply_sales', 'get_supply_by_owner_id', 'get_sales_by_owner_id', 'get_sales_by_nft_contract_id', 'get_supply_by_nft_contract_id', 'get_contract_ids', 'get_sale',
      'storage_minimum_balance', 'storage_balance_of',
      'get_contract_ids_for_account',
      'get_sales',
      'get_auctions',
      'get_number_of_offers',
      'get_number_of_auctions'],
    changeMethods: ['offer', 'add_bid', 'remove_sale', 'end_auction', 'storage_deposit', 'storage_withdraw',
      'add_contract_for_account', 'remove_contract_for_account'],
  })

  return { accountId, nearConfig, nft_contract, marketplace_contract, walletConnection }
}

export async function checkAccount(accountId) {
  const near = await connect(Object.assign({ deps: {} }, nearConfig));
  const account = await near.account(accountId);

  try {
    const response = await account.state();
  }
  catch {
    return false;
  }

  return true;
}

export async function checkStandard(accountId) {
  const near = await connect(Object.assign({ deps: {} }, nearConfig));
  const contract = await new Contract(window.walletConnection.account(), accountId, {
    viewMethods: ['nft_metadata'],
  });

  try {
    const metadata = await contract.nft_metadata();
  }
  catch (e) {
    return false;
  }

  return true;
}

export function clearContentBody() {
  let content = document.getElementById("content");

  let essential = ["header", "footer"]
  let toBeDeleted = [];

  for (let i = 0; i < content.childNodes.length; i++) {
    if (!essential.includes(content.childNodes[i].id))
      toBeDeleted.push(content.childNodes[i])
  }

  for (let i = 0; i < toBeDeleted.length; i++)
    content.removeChild(toBeDeleted[i])
}

export function provokeLogin(container, msg) {
  let state = window.walletConnection.isSignedIn();

  if (!state) {
    let warning_message = document.createElement("div");
    warning_message.id = 'provoke_login'
    warning_message.textContent = msg;
    container.prepend(warning_message);
  }
}

export function createModal(width, height, modalId) {
  let container = document.createElement("div");
  container.classList.add('modal_bg')

  let modal = document.createElement("div")
  modal.classList.add("modal");
  modal.id = modalId;
  modal.style.height = height;
  modal.style.width = width;

  container.appendChild(modal);
  return { container, modal }
}

export async function getContract(set, contract_objects, contract) {
  if (set.has(contract)) {
    return contract_objects[contract]
  }
  else {
    set.add(contract);
    contract_objects[contract] = await new Contract(window.walletConnection.account(), contract, {
      viewMethods: ['nft_metadata', 'nft_total_supply', 'nft_tokens_for_owner', 'nft_token'],
      changeMethods: ['nft_mint', 'nft_transfer', 'nft_approve', 'nft_revoke'],
    })

    return contract_objects[contract]
  }
}