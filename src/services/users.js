import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export async function addUser(newUser) {
	await setDoc(doc(db, "users", newUser.id), {
		id: newUser.id,
		email: newUser.email,
		dateCreated: serverTimestamp(),
	});
}

export async function addArtwork(artwork) {
	const artworkID = uuidv4();
	await setDoc(doc(db, "artwork", artworkID), {
		id: artworkID,
		title: artwork.title,
		artist: artwork.artist,
		dateCreated: serverTimestamp(),
	});

	return { id: artworkID };
}
