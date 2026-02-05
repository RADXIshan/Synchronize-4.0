import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ComingSoon = ({ title = "COMING SOON", subtitle = "Stay Tuned for Updates!" }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[50vh] w-full text-center p-4">
      <div ref={textRef} className="relative z-10">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transform -skew-x-6">
          {title}
        </h2>
        <p className="mt-4 text-white/70 text-lg sm:text-xl font-mono tracking-widest uppercase">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
