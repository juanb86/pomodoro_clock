import React from "react";

function Break(props) {
  return (
    <div className="miniD" id="break">
      <h3 className="miniD-label" id="break-label">
        Break
      </h3>
      <input
        className="miniD-length"
        id="break-length"
        type="number"
        value={props.breakL}
        onChange={props.handleChange}
        min="1"
        max="99"
      />
      <div className="miniD-btns">
        <div className="miniD-div">
          <button
            className="miniD-btn"
            id="break-increment"
            onClick={props.handleClick}
          />
          <h4>Inc</h4>
        </div>
        <div className="miniD-div">
          <button
            className="miniD-btn"
            id="break-decrement"
            onClick={props.handleClick}
          />
          <h4>Dec</h4>
        </div>
      </div>
    </div>
  );
}

export default Break;
