import React, { useEffect } from "react";
import { db } from "../../services/firebase";
import { Col, Row, Container } from "reactstrap";
import Host from "../lobby/Host";
import Join from "../lobby/Join";

const Lobby = () => {
  useEffect(() => {
    db.collection("rooms")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);
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
