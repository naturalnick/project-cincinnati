import { useAuth } from "./hooks/useAuth";
import NavBar from "./components/NavBar";
import { Container, Row } from "react-bootstrap";
import Artwork from "./components/Artwork";
import { useArtwork } from "./hooks/useArtwork";

function App() {
	const auth = useAuth();
	const artwork = useArtwork();

	const artworkItems = artwork?.map((a) => (
		<Artwork key={a.id} id={a.id} title={a.title} artist={a.artist} />
	));

	return (
		<>
			<NavBar auth={auth} />
			<Container>
				<Row>{artworkItems}</Row>
			</Container>
		</>
	);
}

export default App;
