const NEAR_IN_YOCTO=1000000000000000000000000;

async function giveBalance(marketplace_contract, accountId){
	try{
		let result= await marketplace_contract.storage_balance_of({"account_id":accountId})
		let totalSales=await marketplace_contract.get_supply_by_owner_id({"account_id":accountId})
		let minimum_balance=await marketplace_contract.storage_minimum_balance()
		return { 
			total : (result/10**24).toFixed(2),
			locked : (totalSales*minimum_balance/10**24).toFixed(2) 
		}
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

async function deposit_storage(marketplace_contract, amount){
	
	if (!amount){
		alert("Please fill the field appropriately.");
		return;
	}

	if(typeof(amount)!="number")
		alert("Deposit must be a number")

	const deposit = (amount*NEAR_IN_YOCTO).toLocaleString('fullwide', {useGrouping:false});

	try{
		await marketplace_contract.storage_deposit({},
		                                          "300000000000000",
		                                          deposit);
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

async function withdraw_storage(marketplace_contract){
	try{
		await marketplace_contract.storage_withdraw({},
	                                          "300000000000000",
	                                          "1");
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

export {giveBalance, deposit_storage, withdraw_storage}