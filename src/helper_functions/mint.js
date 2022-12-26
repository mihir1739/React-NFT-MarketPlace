import { checkAccount } from "../near/utils.js"
import { create } from "ipfs-http-client"

function validateImageFile(e) {

	const pattern = /image-*/;
	let file = e.target.files[0];

	if (!file.type.match(pattern)) {
		alert('Invalid format');
		e.target.value = '';
		return false;
	}

	if (file.size >= 10000000) {
		alert('File size must not exceed 10 MB');
		e.target.value = '';
		return false;
	}

	return true
}

const readURL = (e, setSrc, setBuffer) => {

	if (!validateImageFile(e))
		return;

	if (e.target.files && e.target.files[0]) {
		const file = e.target.files[0];
		const reader1 = new FileReader();


		reader1.onload = function (e) {
			setSrc(e.target.result);
		};
		reader1.readAsDataURL(file);

		const reader2 = new FileReader()
		reader2.readAsArrayBuffer(file);

		reader2.onloadend = async () => {
			setBuffer(Buffer.from(reader2.result));
		}
	}
}

async function mintListener(title, description, buffer, signedIn, nft_contract, accountId) {
	if (!signedIn) {
		alert('Please Sign In!')
		return;
	}

	let mediaHash;
	if (buffer) {
		mediaHash = await ipfsUpload(buffer);
		// hideModal here
	}

	let d = new Date()
	const tokenId = "token" + d.getTime()

	try {
		await nft_contract.nft_mint({
			"token_id": tokenId,
			"metadata": { "title": title, "description": description, "media": mediaHash },
			"receiver_id": accountId,
			"perpetual_royalties": null
		},
			"300000000000000",
			"100000000000000000000000");
	}
	catch (e) {
		alert(
			'Something went wrong! ' +
			'Maybe you need to sign out and back in? ' +
			'Check your browser console for more info.'
		)
		throw e
	}

}

async function ipfsUpload(buffer) {
	const ipfs = await create({ host: "ipfs.infura.io", protocol: "https", port: 5001 });

	const ipfsHash = await ipfs.add(buffer);
	return ipfsHash.path;
}



export { mintListener, readURL }