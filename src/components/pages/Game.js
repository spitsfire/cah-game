import React from "react";
import { Container, Row, Col } from "reactstrap";

const Game = () => {
  return (
    <Container>
      <Row>
        <Col lg="8">
          <Board />
        </Col>
        <Col lg="4">
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
