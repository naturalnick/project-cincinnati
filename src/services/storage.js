import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "src/firebase";

export async function uploadToStorage(artworkID, file) {
	await uploadBytes(ref(storage, `artwork/${artworkID}`), file);
}

export async function getFromStorage(artworkID) {
	return getDownloadURL(ref(storage, `artwork/${artworkID}`))
		.then((url) => url)
		.catch((error) => {
			console.log(error);
			return null;
		});
}
