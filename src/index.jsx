import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Time from "./components/Time";
import Session from "./components/Session";
import Break from "./components/Break";
import Frame from "./components/Frame";
import beep from "./resources/buzzer.mp3";

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
    this.handleChangeS = this.handleChangeS.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
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

  handleChangeS(e) {
    const value = e.target.value;
    if (value < 100) {
      if (value > 0) {
        this.setState({ sessionL: value, time: value * 60 });
      } else {
        this.setState({ sessionL: 1, time: 60 });
      }
    }
  }

  handleChangeB(e) {
    const value = e.target.value;
    if (value < 100) {
      if (value > 0) {
        this.setState({ breakL: value });
      } else {
        this.setState({ breakL: 1 });
      }
    }
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
        <Break
          breakL={this.state.breakL}
          handleChange={this.handleChangeB}
          handleClick={this.handleClick}
        />
        <Session
          sessionL={this.state.sessionL}
          handleChange={this.handleChangeS}
          handleClick={this.handleClick}
        />
        <Frame />
        <audio id="beep" className="beep" ref={this.audio} src={beep} />
      </div>
    );
  }
}

function segToTime(s) {
  const min = Math.floor(s / 60);
  const minText = min > 9 ? min : "0" + min;
  const seg = s % 60;
  const segText = seg > 9 ? seg : "0" + seg;
  return minText + ":" + segText;
}

// ========================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
