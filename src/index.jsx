import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }
  render() {
    return (
      <div>
        <div id="session">
          <h3 id="session-label">Session</h3>
          <div id="session-decrement">Inc</div>
          <div id="session-increment">Dec</div>
          <div id="session-length">25</div>
        </div>
        <div id="break">
          <h3 id="break-label">Break</h3>
          <div id="break-decrement">Inc</div>
          <div id="break-increment">Dec</div>
          <div id="break-length">5</div>
        </div>
        <div id="time">
          <div id="timer-label">Timer</div>
          <div id="time-left">00:00</div>
          <div id="start_stop">Play/Pause</div>
          <div id="reset">Reset</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
