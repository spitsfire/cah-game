import React, { useState } from "react";
import { Card, Form, Label, Input, Button } from "reactstrap";

const Join = () => {
  // STATE
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  //FUNCTIONS
  const onSubmit = () => {
    //waiting on reducer function
  };

  return (
    <Card className="card-custom ml-auto mr-auto" color="danger">
      <h2 className="h2 title mx-auto text-center text-white">Join a Game</h2>
      <Form className="register-form">
        <Label>Your Name</Label>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
        <Label>Room Code</Label>
        <Input
          className="form-control-lg"
          type="text"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          onClick={onSubmit}
          className="btn-block btn-round mb-4"
          color="secondary"
        >
          Join
        </Button>
      </Form>
    </Card>
  );
};

export default Join;
