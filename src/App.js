import { useEffect } from 'react';
import 'minireset.css';
import './App.css';

function App({
    distortion,
    showIcon,
    backgroundColor,
    stepColors,
    headline
}) {
  const circles = new Array(20).fill(" ")

  function getRandomNumber(max, min) {
    return Math.floor(Math.random() * max + min);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      {headline && <h1>{headline}</h1>}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="bgart"
        version="1.1"
        filter="url(#goo)"
        viewBox="100 100 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {circles.map((circle) => (
          <circle
            key={circle}
            r={Math.floor(Math.random() * 800) + 80}
            cx={Math.floor(Math.random() * 900)}
            cy={Math.floor(Math.random() * 900)}
            strokeWidth={Math.floor(Math.random() * 50 + 5)}
            strokeDasharray={`${getRandomNumber(300, 50)} ${getRandomNumber(500, 900)}`}
          />
        ))}
      </svg>

      <svg styles={{ pointerEvents: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={distortion} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 .5 3 .06" result="goo" />
            <feColorMatrix in="goo" mode="matrix" values="1 0 0 1 0  0 1 0 0 0  0 0 -1 0 .1  0 1 5 56 -5" result="goo2" />
          </filter>

          <linearGradient id="bggrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stepColors[0]} />
            <stop offset="100%" stopColor={stepColors[1]} />
          </linearGradient>
        </defs>
      </svg>
      {!headline && showIcon && (
        <svg viewBox="-3 0 8 11" class="make-logo" stroke="white" strokeWidth="1" fill="none">
          <path strokeWidth="1.5" d="m -2 8.2 a 1 1 0 0 1 4 0 m -2 -3.25 a 1 -1 0 0 1 4 0 v 3.25" />
        </svg>
      )}
    </div>
  );
}

export default App;

App.defaultProps = {
  distortion: 100,
  showIcon: true,
  backgroundColor: '#205efe',
  stepColors: ['#e40046', '#ff8674']
}
