import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Spinner } from "reactstrap";
import { startGame } from "../../redux/reducers";

const Board = ({ roomReducer: { room, currentCzar }, startGame }) => {
  // FUNCTIONS

  useEffect(() => {
    return (
      <Fragment>
        <h3>
          Waiting for All Players <Spinner color="light"></Spinner>
        </h3>
        {room.host === localStorage.getItem("puid") ? (
          <Button
            onClick={() => startGame()}
            className="btn btn-primary mt-3 btn-lg"
          >
            Start Game
          </Button>
        ) : null}
      </Fragment>
    );
  }, []);

  return <div></div>;
};

const mapStateToProps = (state) => ({
  roomReducer: state.roomReducer,
});

export default connect(mapStateToProps, { startGame })(Host);
