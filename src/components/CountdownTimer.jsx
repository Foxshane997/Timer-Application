import React, { useState, useEffect } from "react";
import "../assets/styles/CountdownTimer.css";

const CountdownTimer = () => {
  const [time, setTime] = useState(300); // default to 5 minutes (300 seconds)
  const [selectedTime, setSelectedTime] = useState(300); // default selected time
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

  return (
    <div className="timer">
      <h1>Countdown Timer</h1>
      <select value={selectedTime / 60} onChange={handleTimeChange}>
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
        <option value={15}>15 minutes</option>
        <option value={20}>20 minutes</option>
      </select>
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
