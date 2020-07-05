import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "00:00",
      sessionL: 20,
      breakL: 4,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let { time, sessionL, breakL } = this.state;
    switch (e.target.id) {
      case "reset":
        time = "00:00";
        sessionL = 25;
        breakL = 5;
        break;
      case "session-increment":
        sessionL < 60 && sessionL++;
        break;
      case "session-decrement":
        sessionL > 1 && sessionL--;
        break;
      case "break-increment":
        breakL < 60 && breakL++;
        break;
      case "break-decrement":
        breakL > 1 && breakL--;
        break;
      default:
        console.log("???");
    }
    this.setState({ time: time, sessionL: sessionL, breakL: breakL });
  }

  render() {
    return (
      <div>
        <div id="session">
          <h3 id="session-label">Session</h3>
          <div id="session-increment" onClick={this.handleClick}>
            Inc
          </div>
          <div id="session-decrement" onClick={this.handleClick}>
            Dec
          </div>
          <div id="session-length">{this.state.sessionL}</div>
        </div>
        <div id="break">
          <h3 id="break-label">Break</h3>
          <div id="break-increment" onClick={this.handleClick}>
            Inc
          </div>
          <div id="break-decrement" onClick={this.handleClick}>
            Dec
          </div>
          <div id="break-length">{this.state.breakL}</div>
        </div>
        <div id="time">
          <h3 id="timer-label">Timer</h3>
          <div id="time-left">{this.state.time}</div>
          <div id="start_stop">Play/Pause</div>
          <div id="reset" onClick={this.handleClick}>
            Reset
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
