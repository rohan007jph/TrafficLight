import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [signal, setSignal] = useState("red");
  const [message, setMessage] = useState("Stop");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerReset = () => {
      if (signal === "red") setTimer(60);
      else if (signal === "yellow") setTimer(30);
      else if (signal === "green") setTimer(120);
    };

    timerReset();
  }, [signal]);

  useEffect(() => {
    const timerExpired = () => {
      if (timer === 0) {
        if (signal === "red") {
          setSignal("yellow");
          setMessage("Ready");
        } else if (signal === "yellow") {
          setSignal("green");
          setMessage("Go");
        } else if (signal === "green") {
          setSignal("red");
          setMessage("Stop");
        }
      }
    };

    timerExpired();
  }, [timer]);

  const handleSignalChange = (newSignal, newMessage) => {
    setSignal(newSignal);
    setMessage(newMessage);
  };

  return (
    <div>
      <div className="signal-message">{message}</div>
      <div className="traffic-light">
        <div
          className={`light red ${signal === "red" ? "active" : ""}`}
          onClick={() => handleSignalChange("red", "Stop")}
        />
        <div
          className={`light yellow ${signal === "yellow" ? "active" : ""}`}
          onClick={() => handleSignalChange("yellow", "Ready")}
        />
        <div
          className={`light green ${signal === "green" ? "active" : ""}`}
          onClick={() => handleSignalChange("green", "Go")}
        />
      </div>
      <div className="timer">Timer: {timer} seconds</div>
    </div>
  );
};

export default TrafficLight;
