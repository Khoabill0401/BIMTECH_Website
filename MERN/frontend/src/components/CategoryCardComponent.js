import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ category, idx }) => {

    const images = [
        "/images/Pic2.jpg",
        "/images/Pic2.jpg",
        "/images/Pic2.jpg",
        "/images/Pic2.jpg",
        "/images/Pic2.jpg",
        "/images/Pic2.jpg",
    ];

    const mystyle = {
        // position: "absolute",
        width: "25rem",
        left: "0%",
        // top: "50%",
        // transform: "translate(-50%, -50%)",
      };

    return (
        <Card style={mystyle}>
            <Card.Img crossorigin="anonymous" variant="top" src={images[idx]} />
            <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <LinkContainer to="/products">
                    <Button variant="primary">Go to the Category</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
};

export default CategoryCardComponent;
