import { useEffect, useState } from "react";
import { getFromStorage } from "src/services/storage";

export function useImage(artworkID) {
	const [image, setImage] = useState(undefined);

	useEffect(() => {
		(async () => {
			const file = await getFromStorage(artworkID);
			setImage(file);
		})();
	}, [artworkID]);

	return image;
}
