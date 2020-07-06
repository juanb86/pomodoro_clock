import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Session(props) {
  return (
    <div id="session">
      <h3 id="session-label">Session Length</h3>
      <div id="session-increment" onClick={props.handleClick}>
        Inc
      </div>
      <div id="session-decrement" onClick={props.handleClick}>
        Dec
      </div>
      <div id="session-length">{props.sessionL}</div>
    </div>
  );
}

function Break(props) {
  return (
    <div id="break">
      <h3 id="break-label">Break Length</h3>
      <div id="break-increment" onClick={props.handleClick}>
        Inc
      </div>
      <div id="break-decrement" onClick={props.handleClick}>
        Dec
      </div>
      <div id="break-length">{props.breakL}</div>
    </div>
  );
}

function Time(props) {
  return (
    <div id="time">
      <h3 id="timer-label">{props.fase}</h3>
      <div id="time-left">{props.time}</div>
      <div id="start_stop" onClick={props.updateTime}>
        Play/Pause
      </div>
      <div id="reset" onClick={props.handleClick}>
        Reset
      </div>
    </div>
  );
}

function segToTime(s) {
  const min = Math.floor(s / 60);
  const seg = s % 60;
  return seg < 10 ? min + ":0" + seg : min + ":" + seg;
}

function timeToSeg(time) {
  let min = Number(time.splice(0, 2));
  let seg = Number(time.splice(3));
  return min * 60 + seg;
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      sessionL: 25,
      breakL: 5,
      running: false,
      fase: "Session",
    };
    this.updateTime = this.updateTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateTime() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.timerID = setInterval(() => this.tick(), 10);
    } else {
      this.setState({ running: false });
      clearInterval(this.timerID);
    }
  }

  tick() {
    let { time, sessionL, breakL, running, fase } = this.state;
    if (time > 0) {
      this.setState({ time: time - 1 });
    } else if (fase === "Session") {
      this.setState({ time: breakL * 60, fase: "Break" });
    } else if (fase === "Break") {
      this.setState({ time: sessionL * 60, fase: "Session" });
    }
    console.log(fase);
  }

  handleClick(e) {
    let { time, sessionL, breakL, running } = this.state;
    switch (e.target.id) {
      case "reset":
        running = false;
        clearInterval(this.timerID);
        time = 1500;
        sessionL = 25;
        breakL = 5;
        break;
      case "session-increment":
        sessionL < 60 && sessionL++ && (time = sessionL * 60);
        break;
      case "session-decrement":
        sessionL > 1 && sessionL-- && (time = sessionL * 60);
        break;
      case "break-increment":
        breakL < 60 && breakL++;
        break;
      case "break-decrement":
        breakL > 1 && breakL--;
        break;
      default:
        console.log(e.target.id + " where you come from?");
    }
    this.setState({
      time: time,
      sessionL: sessionL,
      breakL: breakL,
      running: running,
    });
  }

  render() {
    return (
      <div>
        <Session
          sessionL={this.state.sessionL}
          handleClick={this.handleClick}
        />
        <Break breakL={this.state.breakL} handleClick={this.handleClick} />
        <Time
          fase={this.state.fase}
          time={segToTime(this.state.time)}
          handleClick={this.handleClick}
          updateTime={this.updateTime}
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
