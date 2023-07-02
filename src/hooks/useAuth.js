import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fAuth } from "src/firebase";

export function useAuth() {
	const [auth, setAuth] = useState(undefined);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(fAuth, async (user) => {
			setAuth(!!user);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return auth;
}
