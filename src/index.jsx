import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import beep from "./buzzer.mp3";

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
      <div id="inner-border">
        <h3 id="timer-label">{props.fase}</h3>
        <div id="time-left">{props.time}</div>
        <div id="start_stop" onClick={props.updateTime}>
          Play/Pause
        </div>
        <div id="reset" onClick={props.handleClick}>
          Reset
        </div>
      </div>
    </div>
  );
}

function segToTime(s) {
  const min = Math.floor(s / 60);
  const minText = min > 9 ? min : "0" + min;
  const seg = s % 60;
  const segText = seg > 9 ? seg : "0" + seg;
  return minText + ":" + segText;
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
    this.audio = React.createRef();
    this.updateTime = this.updateTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateTime() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.timerID = setInterval(() => this.tick(), 1000);
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
      this.audio.current.currentTime = 0;
      this.audio.current.play();
      this.setState({ time: breakL * 60, fase: "Break" });
    } else if (fase === "Break") {
      this.audio.current.currentTime = 0;
      this.audio.current.play();
      this.setState({ time: sessionL * 60, fase: "Session" });
    }
    console.log(fase);
  }

  handleClick(e) {
    let { time, sessionL, breakL, running, fase } = this.state;
    switch (e.target.id) {
      case "reset":
        running = false;
        clearInterval(this.timerID);
        this.audio.current.pause();
        this.audio.current.currentTime = 0;
        time = 1500;
        sessionL = 25;
        breakL = 5;
        fase = "Session";
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
      fase: fase,
    });
  }

  render() {
    return (
      <div id="pomodoro">
        <Time
          fase={this.state.fase}
          time={segToTime(this.state.time)}
          handleClick={this.handleClick}
          updateTime={this.updateTime}
        />
        <Session
          sessionL={this.state.sessionL}
          handleClick={this.handleClick}
        />
        <Break breakL={this.state.breakL} handleClick={this.handleClick} />
        <audio id="beep" className="beep" ref={this.audio} src={beep} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
