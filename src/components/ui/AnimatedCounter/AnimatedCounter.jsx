import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    let startTime;

    function step(timestamp) {
      if (startTime === undefined) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    }

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return <>{count}</>;
}

export default AnimatedCounter;
