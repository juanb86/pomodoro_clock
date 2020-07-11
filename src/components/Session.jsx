import React from "react";

function Session(props) {
  return (
    <div className="miniD" id="session">
      <h3 className="miniD-label" id="session-label">
        Session
      </h3>
      <div className="miniD-length" id="session-length">
        {props.sessionL}
      </div>
      <div className="miniD-btns">
        <div className="miniD-div">
          <button
            className="miniD-btn"
            id="session-increment"
            onClick={props.handleClick}
          />
          <h4>Inc</h4>
        </div>
        <div className="miniD-div">
          <button
            className="miniD-btn"
            id="session-decrement"
            onClick={props.handleClick}
          />
          <h4>Dec</h4>
        </div>
      </div>
    </div>
  );
}

export default Session;
