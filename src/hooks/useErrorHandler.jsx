import { useMemo, useState } from "react";
import { Alert } from "react-bootstrap";

export function useErrorHandler() {
	const [error, setError] = useState(undefined);

	const ErrorMessage = useMemo(
		() =>
			error ? (
				<Alert
					dismissible
					variant="danger"
					show={error != undefined}
					onClose={dismissError}
					className="my-2"
				>
					<span className="danger">ERROR: </span>
					{processError(error)}
				</Alert>
			) : null,
		[error]
	);

	function dismissError() {
		setError(undefined);
	}

	function processError(e) {
		if (typeof e == "object") {
			if ("code" in e) {
				switch (e.code) {
					case "auth/email-already-in-use":
						return "Email already in use.";
					case "auth/user-not-found":
						return "Account not found. ";
					case "auth/wrong-password":
						return "Incorrect password.";
					case "weak-password":
						return "Password must be at least 6 characters.";
					case "invalid-argument":
						return `Error: could not process request. (${e.message})`;
					default:
						return e.code;
				}
			}
			if ("message" in e) return e.message;
			return JSON.stringify(e);
		}
		return e;
	}

	return { setError, ErrorMessage };
}
