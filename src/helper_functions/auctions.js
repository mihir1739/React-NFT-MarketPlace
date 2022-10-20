// GLOBAL CONSTANTS
const EXCEPTION = 300000000;
const NEAR_IN_YOCTO = 1000000000000000000000000;
const MIN_BID_INCREMENT = 0.01;

async function bid(walletConnection, marketplace_contract, accountId, sale, bid_amount, currentPrice){
	if(!walletConnection.isSignedIn())
	{	alert('Please Sign In!')
		return;
	}

	if(accountId==sale.owner_id){
		alert('Cant bid on your own token!');
		return;
	}

	let startTime=(sale.start_time/(10**6))
	let endTime=(sale.end_time/(10**6))
	let currentTime=(new Date).getTime()

	if(currentTime < startTime){
		alert(`Auction has not begun yet, please try again at ${new Date(startTime)}`)
		return;
	}

	if(currentTime > endTime){
		alert('Auction has already ended, please end the auction.')
		return;
	}

	bid_amount = parseFloat(bid_amount);
	let min_amount = parseFloat(currentPrice) + MIN_BID_INCREMENT	
		
	if (bid_amount < min_amount){
		alert(`Please bid higher than ${min_amount} NEAR`);
		return;
	}

	// EXCEPTION amount arises from limits of using toLocaleString which can only render accurately till 10**15. 
	bid_amount=(bid_amount*NEAR_IN_YOCTO + EXCEPTION).toLocaleString('fullwide', {useGrouping:false});

	console.log(bid_amount)

	try{
		await marketplace_contract.add_bid({"nft_contract_id": sale.nft_contract_id, 
		                                          "token_id": sale.token_id},
		                                          "300000000000000",
		                                          bid_amount);
	}
	catch(e){
		alert(
		  'Something went wrong! ' +
		  'Maybe you need to sign out and back in? ' +
		  'Check your browser console for more info.'
		)
		throw e
	}
}

async function end_auction(sale, walletConnection, marketplace_contract){

	if(!walletConnection.isSignedIn()){	
		alert('Please Sign In!')
		return;
	}

	let endTime=(sale.end_time/(10**6))
	let currentTime=(new Date).getTime()

	if(currentTime < endTime){
		alert(`Cannot end the auction now, please try again at ${new Date(endTime)}`)
		return;
	}

	try{
		// Ending auction, if there is a bid its transferred otherwise only the sale gets removed.
		// which is why a revoke transaction is also added to remove the approval, this is so that when the
		// auction ends with no bids, the token tab must enable to list it again.
		await marketplace_contract.end_auction({"nft_contract_id": sale.nft_contract_id, 
		                                          "token_id":sale.token_id},
		                                          "300000000000000");
	}
	catch(e){
		alert(
		  'Something went wrong! ' +
		  'Maybe you need to sign out and back in? ' +
		  'Check your browser console for more info.'
		)
		throw e
	}
}

export {end_auction, bid}