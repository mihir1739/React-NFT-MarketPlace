import {useState} from 'react'
import { v4 as uuidv4 } from "uuid";

import Royalty from './Royalty'

const Royalties = (props) =>{

	const [royaltyDOM, setRoyaltyDOM] = useState([])

	const addRoyaltyDOM = (e) =>{
		const new_id = uuidv4();
		setRoyaltyDOM([...royaltyDOM, {listId:new_id}])
		props.add(new_id)
	}

	const deleteRoyaltyDOM = (listId) =>{
		setRoyaltyDOM(
	      royaltyDOM.filter(item =>{
	        return item.listId !== listId;
	      })
	    )
	    props.delete(listId)
	}

	return(
		<>
			<label htmlFor="">Royalties</label>
			<button onClick={addRoyaltyDOM}> + </button>
			{royaltyDOM.map((input) => {
				return <Royalty update={props.update} delete={deleteRoyaltyDOM} key={input.listId} listId={input.listId} />
			})}
		</>
	)
}

export default Royalties