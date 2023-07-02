import { Col, Image } from "react-bootstrap";
import { useImage } from "src/hooks/useImage";
import PropTypes from "prop-types";

function Artwork({ id, title, artist }) {
	const image = useImage(id);
	console.log(image);
	return (
		<Col lg={6} xl={4} className="d-flex justify-content-center">
			<div className="p-lg-3 p-xl-5">
				<Image src={image} fluid />
				<div className="text-start">
					<div>Title: {title}</div>
					<div>Artist: {artist}</div>
				</div>
			</div>
		</Col>
	);
}

Artwork.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	artist: PropTypes.string,
};

export default Artwork;
