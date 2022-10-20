import "./royalty.css"

const Royalty = (props) =>{

	const updateRoyalty = (e) =>{
		const parent = e.target.parentNode;
		const royaltyAccount = parent.querySelector('#royalty-account').value;
		const royaltyPercentage = parent.querySelector('#royalty-percentage').value;
		
		props.update({
			account: royaltyAccount,
			percentage: royaltyPercentage, 
			listId: props.listId
		});
	}

	const deleteRoyalty = (e) =>{
		// Remove from state
		props.delete(props.listId)
	}

	return(
		<div className='royalty' onChange={updateRoyalty}>
			<input id='royalty-account' type="text" placeholder='Account Id' required></input>
			<input id='royalty-percentage' type="number" placeholder='Share Percentage (5,10,20)' min="1" max="100" required></input>
			<button id='delete' onClick={deleteRoyalty}>X</button>
		</div>
	)
}

export default Royalty