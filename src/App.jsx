import React from 'react'
import './App.css'

const App = () => {
  const [timeLeft, setTimeLeft] = React.useState(1800); // 25 minutes);
  const [isRunning, setIsRunning] = React.useState(false);
  const intervalRef = React.useRef(null);


  console.log("intervalRef:", intervalRef.current)
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  //const formatTime = (time) => {
  // const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  // const seconds = String(time % 60).padStart(2, '0')
  // return `${minutes}:${seconds}`
  //}

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            alert("Time's up!");
            return 1500; // Reset to 25 minutes
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current); // Cleanup
  }, [isRunning]);

  /**
   * React.useEffect(() => {
   * if(isRunning) {
   *  intervalRef.current = setInterval(()=> {
   *  setTimeLeft((prevTime) =>{
   * if(prevTime === 1) {
   * clearInterval(false)}})
   * alert("Time is up!")
   * return 1500 // Reset to 25 minutes
   * }
   *  return prevTime - 1
   * )
   * }},[isRunning])
   */

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(1500);
  };

  return (
    <div className="container">
      <h1 className="title">Pomodoro Timer</h1>
      <p className="timer" id="timer">{formatTime(timeLeft)}</p>

      <div className="button-wrapper">
        <button id="start" onClick={startTimer}>Start</button>
        <button id="stop" onClick={stopTimer}>Stop</button>
        <button id="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default App

//  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
// const [isRunning, setIsRunning] = useState(false);
// const intervalRef = useRef(null);

// const formatTime = (time) => {
//   const minutes = String(Math.floor(time / 60)).padStart(2, '0');
//   const seconds = String(time % 60).padStart(2, '0');
//   return `${minutes}:${seconds}`;
// };
