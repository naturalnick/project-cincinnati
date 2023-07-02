import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { fAuth } from "src/firebase";
import { addUser } from "./users";

export async function loginUser(email, password) {
	await signInWithEmailAndPassword(fAuth, email, password);
}

export async function createUser(email, password) {
	const res = await createUserWithEmailAndPassword(fAuth, email, password);

	await addUser({ id: res.user.uid, email: email });
}

export async function logoutUser() {
	await signOut(fAuth);
}
