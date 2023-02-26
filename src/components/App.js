import React, { useRef, useState } from 'react'
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [lapsAdded, setLapsAdded] = useState(false);

const formatTime = (time) => {
  if (isNaN(time)) {
    return '00:00:00.000';
  }
  const ms = `00${(time % 1000)}`.slice(-3);
  const s = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const m = `0${Math.floor(time / (1000 * 60)) % 60}`.slice(-2);
  const h = `0${Math.floor(time / (1000 * 60 * 60))}`.slice(-2);
  return `${h}:${m}:${s}.${ms}`;
};



  const handleStart = () => {
  startTime.current = Date.now() - currentTime;
  intervalRef.current = setInterval(() => {
    const newTime = Date.now() - startTime.current;
    setCurrentTime(newTime);
    if (lapsAdded) {
      setLaps((laps) => [
        ...laps.slice(0, laps.length - 1),
        formatTime(newTime - laps.reduce((total, lap) => total + parseTime(lap), 0)),
        formatTime(newTime),
      ]);
    }
  }, 10);
};

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

 const handleLap = () => {
  const lapTime = formatTime(currentTime);
  if (!lapsAdded) {
    setLapsAdded(true);
  }
  setLaps((laps) => [...laps, lapTime]);
};


  const handleReset = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
    setLapsAdded(false);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{formatTime(currentTime)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={handleStart}>START</button>
          <button className="stop-btn" onClick={handleStop}>STOP</button>
          <button className="lap-btn" onClick={handleLap}>LAP</button>
          <button className="reset-btn" onClick={handleReset}>RESET</button>
        </section>
      </section>
      {lapsAdded &&
        <section className='lap-section'>
          <h2>Laps</h2>
          <section className='laps'>
            {laps.map((lap, index) => (
              <p key={index}>{`Lap ${index + 1}: ${lap}`}</p>
            ))}
          </section>
        </section>
      }
    </div>
  );
};

export default App;
