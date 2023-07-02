import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";
import { logoutUser } from "src/services/auth";
import { IoMdLogIn } from "react-icons/io";
import LoginModal from "./LoginModal";
import ArtworkModal from "./ArtworkModal";

function NavBar({ auth }) {
	const [loginModalShown, setLoginModalShown] = useState(false);
	const [artworkModalShown, setArtworkModalShown] = useState(false);

	return (
		<Navbar
			bg="light"
			data-bs-theme="light"
			expand="sm"
			className="text-light"
			collapseOnSelect
		>
			<Container>
				<Navbar.Brand>Cincinnati</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="justify-content-end "
				>
					<div className="d-flex flex-column flex-sm-row gap-2">
						{auth && (
							<>
								<Button onClick={() => setArtworkModalShown(true)}>
									New
								</Button>
							</>
						)}
						{auth ? (
							<>
								<Button
									onClick={logoutUser}
									variant="link"
									className="text-decoration-none p-0"
								>
									Logout
								</Button>
							</>
						) : (
							<IoMdLogIn
								onClick={() => setLoginModalShown(true)}
								size={28}
								color="black"
							/>
						)}
					</div>
				</Navbar.Collapse>
			</Container>
			<LoginModal
				show={loginModalShown}
				handleClose={() => setLoginModalShown(false)}
			/>
			<ArtworkModal
				show={artworkModalShown}
				handleClose={() => setArtworkModalShown(false)}
			/>
		</Navbar>
	);
}

NavBar.propTypes = {
	auth: PropTypes.bool,
};

export default NavBar;
