import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(counterRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      });
    }
  }, [counter, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black flex items-center justify-center text-white" style={{ zIndex: 99999 }}>
      <div ref={counterRef} className="text-9xl font-display font-bold">
        {counter}%
      </div>
    </div>
  );
};

export default Preloader;
