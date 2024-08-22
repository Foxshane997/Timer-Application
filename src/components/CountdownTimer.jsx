import React, { useState, useEffect } from "react";
import "../assets/styles/CountdownTimer.css";

const CountdownTimer = () => {
  const [time, setTime] = useState(2400); // Default to 40 minutes (2400 seconds)
  const [selectedTime, setSelectedTime] = useState(2400); // Default selected time
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value) * 60;
    setSelectedTime(newTime);
    setTime(newTime);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(selectedTime);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculateStrokeOffset = (elapsedTime) => {
    const circumference = 283;
    const timeRatio = time / selectedTime;
    const maxStroke = (selectedTime / 2400) * circumference; // 40 minutes as the max
    const offset = maxStroke * timeRatio;
    return circumference - offset;
  };

  const strokeDashoffset = isRunning ? calculateStrokeOffset(time) : calculateStrokeOffset(selectedTime);

  return (
    <div className="timer">
      <h1>Countdown Timer</h1>
      <div className="select-wrapper">
        <select value={selectedTime / 60} onChange={handleTimeChange}>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
          <option value={20}>20 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={40}>40 minutes</option>
        </select>
      </div>
      <div className="circle">
        <svg>
          <circle cx="50%" cy="50%" r="45%" className="background-circle" />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="progress-circle"
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="time-text">{formatTime(time)}</div>
      </div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
