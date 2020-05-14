import React, { useState } from "react";
import { Card, Input, Label, Button, Form } from "reactstrap";

const Host = () => {
  // STATE
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [cap, setCap] = useState();
  const [rounds, setRounds] = useState();

  // FUNCTIONS
  const onSubmit = () => {
    // waiting for reducer function
  };

  return (
    <Card className="card-custom ml-auto mr-auto" color="info">
      <h2 className="h2 title mx-auto text-white">Host a New Game</h2>
      <Form className="register-form">
        <Label>Your Name</Label>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
        <Label>Room Name</Label>
        <Input type="text" onChange={(e) => setRoom(e.target.value)} />
        <Label>
          Room Capacity <small>(incl. host)</small>
        </Label>
        <Input
          type="number"
          placeholder="3-10 players"
          onChange={(e) => setCap(e.target.value)}
          min="3"
          max="10"
        />
        <Label>No. of Rounds</Label>
        <Input
          type="number"
          placeholder="1-5 rounds"
          onChange={(e) => setRounds(e.target.value)}
        />
        <Button
          onClick={onSubmit}
          block
          className="btn-block btn-round mb-4"
          color="primary"
        >
          Create
        </Button>
      </Form>
    </Card>
  );
};

export default Host;
