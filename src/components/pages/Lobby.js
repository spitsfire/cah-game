import React from "react";
import { Col, Row, Container } from "reactstrap";

const Lobby = () => {
  return (
    <Container>
      <Row>
        <Col className="ml-auto mr-auto" lg="6">
          <Host />
        </Col>
        <Col className="ml-auto mr-auto" lg="6">
          <Join />
        </Col>
      </Row>
    </Container>
  );
};

export default Lobby;
