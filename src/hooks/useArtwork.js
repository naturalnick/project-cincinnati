import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/firebase";

export function useArtwork() {
	const [artwork, setArtwork] = useState(undefined);

	useEffect(() => {
		const q = query(collection(db, "artwork"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const artworkData = [];
			querySnapshot.forEach((doc) => {
				artworkData.push(doc.data());
			});
			setArtwork(artworkData);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return artwork;
}
