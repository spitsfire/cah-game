import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { checkCode, joinRoom } from "./../../redux/actions/roomActions";
import { Card, Form, Label, Input, Button } from "reactstrap";

const Join = ({ roomReducer: { room, isValid }, checkCode, joinRoom }) => {
  // STATE
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  //FUNCTIONS
  const onSubmit = () => {
    joinRoom(name, code);
  };

  useEffect(() => {
    if (name !== "") {
      checkCode(code);
    }
  }, [code, name]);

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
          style={!isValid ? { cursor: "default" } : { cursor: "pointer" }}
          disabled={!isValid}
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

const mapStateToProps = (state) => ({
  roomReducer: state.roomReducer,
});

export default connect(mapStateToProps, { checkCode, joinRoom })(Join);
