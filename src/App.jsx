import { useState, useEffect, useRef } from "react";

function App() {
  // Game state
  const [homeScore, setHomeScore] = useState(9);
  const [guestScore, setGuestScore] = useState(0);
  const [gameTime, setGameTime] = useState(600); // 24:00 format
  const [period, setPeriod] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [homePossession, setHomePossession] = useState(true);
  const [guestPossession, setGuestPossession] = useState(false);
  const [homeBonus, setHomeBonus] = useState(false);
  const [guestBonus, setGuestBonus] = useState(false);
  
  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setGameTime((prev) => {
          if (prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Format time as MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Toggle possession
  const togglePossession = () => {
    setHomePossession(!homePossession);
    setGuestPossession(!guestPossession);
  };

  // Change period
  const changePeriod = () => {
    setPeriod((prev) => (prev % 4) + 1);
  };

  // Reset game
  const resetGame = () => {
    setHomeScore(0);
    setGuestScore(0);
    setGameTime(600);
    setPeriod(1);
    setIsRunning(false);
    setHomePossession(true);
    setGuestPossession(false);
    setHomeBonus(false);
    setGuestBonus(false);
  };
  
  // Set custom time
  const setCustomTime = () => {
    const input = prompt("Enter time in MM:SS format (e.g. 12:00):");
    if (input) {
      const parts = input.split(":");
      if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        
        if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
          const totalSeconds = (minutes * 60) + seconds;
          setGameTime(totalSeconds);
        } else {
          alert("Please enter a valid time format (MM:SS)");
        }
      } else {
        alert("Please enter time in MM:SS format");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-black rounded-lg shadow-2xl p-6 border-4 border-gray-800">
        {/* Time Display */}
        <div className="flex justify-center mb-4">
          <div className="bg-black border-2 border-gray-800 px-6 py-3 rounded">
            <p className="text-yellow-500 text-6xl font-mono tracking-wider font-bold text-center flex justify-center"
               style={{ textShadow: "0 0 10px rgba(255, 204, 0, 0.7)" }}>
              {formatTime(gameTime)}
            </p>
          </div>
        </div>
        
        {/* Team Labels */}
        <div className="flex justify-between mb-3">
          <h2 className="text-white text-5xl px-6 font-bold">HOME</h2>
          <h2 className="text-white text-5xl px-6 font-bold">GUEST</h2>
        </div>
        
        {/* Score Display */}
        <div className="flex justify-between mb-8">
          {/* Home Score */}
          <div className="bg-black border-2 border-gray-800 px-6 py-4 rounded w-64 text-center">
            <p className="text-red-600 text-8xl font-mono font-bold"
               style={{ textShadow: "0 0 10px rgba(255, 0, 0, 0.7)" }}>
              {String(homeScore).padStart(2, "0")}
            </p>
          </div>
          
          {/* Period Display */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-xl mb-1">Quarter</p>
            <div className="bg-black border-2 border-gray-800 w-16 h-16 rounded-full flex items-center justify-center">
              <p className="text-green-500 text-4xl font-bold"
                 style={{ textShadow: "0 0 10px rgba(0, 255, 0, 0.7)" }}>
                {period}
              </p>
            </div>
          </div>
          
          {/* Guest Score */}
          <div className="bg-black border-2 border-gray-800 px-6 py-4 rounded w-64 text-center">
            <p className="text-red-600 text-8xl font-mono font-bold"
               style={{ textShadow: "0 0 10px rgba(255, 0, 0, 0.7)" }}>
              {String(guestScore).padStart(2, "0")}
            </p>
          </div>
        </div>
        
        {/* Possession and Bonus Indicators */}
        <div className="flex justify-between mb-6">
          <div className="w-64 text-center">
            <div className="flex justify-between items-center ml-20">
              <div className="flex items-center ่">
                <p className="text-white text-2xl mr-2">BONUS</p>
                <div className={`h-4 w-4 rounded-full ${homeBonus ? 'bg-yellow-400' : 'bg-gray-800'}`}
                     style={{ boxShadow: homeBonus ? "0 0 8px rgba(255, 204, 0, 0.8)" : "none" }}></div>
              </div>
            </div>
          </div>
          <div className="w-64 text-center">
            <div className="flex justify-between items-center ml-20">
              <div className="flex items-center">
                <p className="text-white text-2xl mr-2">BONUS</p>
                <div className={`h-4 w-4 rounded-full ${guestBonus ? 'bg-yellow-400' : 'bg-gray-800'}`}
                     style={{ boxShadow: guestBonus ? "0 0 8px rgba(255, 204, 0, 0.8)" : "none" }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* Home Controls */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setHomeScore(homeScore + 1)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +1
              </button>
              <button 
                onClick={() => setHomeScore(homeScore + 2)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +2
              </button>
              <button 
                onClick={() => setHomeScore(homeScore + 3)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +3
              </button>
              <button 
                onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                className="bg-red-900 hover:bg-red-800 text-white py-2 rounded">
                -1
              </button>
            </div>
            <button 
              onClick={() => setHomeBonus(!homeBonus)}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded w-full">
              Toggle Bonus
            </button>
          </div>
          
          {/* Center Controls */}
          <div className="space-y-2">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`${isRunning ? 'bg-red-900 hover:bg-red-800' : 'bg-green-900 hover:bg-green-800'} text-white py-2 rounded w-full`}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={setCustomTime}
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 rounded w-full">
              Set Time
            </button>
            <button 
              onClick={changePeriod}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded w-full">
              Next Quarter
            </button>
            <button 
              onClick={resetGame}
              className="bg-red-900 hover:bg-red-800 text-white py-2 rounded w-full">
              Reset Game
            </button>
          </div>
          
          {/* Guest Controls */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setGuestScore(guestScore + 1)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +1
              </button>
              <button 
                onClick={() => setGuestScore(guestScore + 2)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +2
              </button>
              <button 
                onClick={() => setGuestScore(guestScore + 3)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded">
                +3
              </button>
              <button 
                onClick={() => setGuestScore(Math.max(0, guestScore - 1))}
                className="bg-red-900 hover:bg-red-800 text-white py-2 rounded">
                -1
              </button>
            </div>
            <button 
              onClick={() => setGuestBonus(!guestBonus)}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded w-full">
              Toggle Bonus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;