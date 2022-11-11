import { Container, Row, Col } from "react-bootstrap";
import './FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="foot_bg text-white text-center py-5">
            Copyright &copy; BIMTech JSC
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;

