import React from "react";

function Time(props) {
  return (
    <div id="time">
      <div id="inner-border">
        <h3 id="timer-label">{props.fase}</h3>
        <div id="label-session">
          <h3>Session</h3>
          <h3
            style={
              props.fase === "Session"
                ? { display: "initial" }
                : { display: "none" }
            }
            className="fase-dot"
          >
            .
          </h3>
        </div>
        <div id="label-break">
          <h3>Break</h3>
          <h3
            style={
              props.fase === "Break"
                ? { display: "initial" }
                : { display: "none" }
            }
            className="fase-dot"
          >
            .
          </h3>
        </div>

        <div id="time-left">{props.time}</div>
        <div id="div-start_stop">
          <button id="start_stop" onClick={props.updateTime} />
          <h3>Play/Pause</h3>
        </div>
        <div id="div-reset">
          <button id="reset" onClick={props.handleClick} />
          <h3>Reset</h3>
        </div>
      </div>
    </div>
  );
}

export default Time;
