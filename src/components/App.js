import React, { useRef, useState } from 'react'
import '../styles/App.css';
const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  
    const startTimer = () => {
    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const lapTimer = () => {
    const lapTime = currentTime.toFixed(3);
    setLaps([...laps, lapTime]);
  };

  const resetTimer = () => {
    setCurrentTime(0);
    setLaps([]);
    clearInterval(intervalRef.current);
  };

  return (
    <div id="main">
     <section>
        <h1 className="seconds-elapsed">{(currentTime / 1000).toFixed(3)}</h1>
        <section className="buttons">
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapTimer}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      <section className={`lap-section ${laps.length > 0 ? 'visible' : ''}`}>
        <h2>Laps</h2>
        {laps.length > 0 ? (
          <section className="laps">
            {laps.map((lap, index) => (
              <p key={index}>Lap {index + 1}: {lap}s</p>
            ))}
          </section>
        ) : (
          <p>No Laps Recorded Yet</p>
        )}
      </section>
    </div>
  )
}


export default App;
