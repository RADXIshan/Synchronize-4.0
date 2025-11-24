import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Starfield background matching main theme
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    // Particles for loading effect
    const particles = Array.from({ length: 50 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 150 + Math.random() * 50,
      speed: Math.random() * 0.02 + 0.01,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3
    }));
    particlesRef.current = particles;

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.shadowBlur = star.size > 1 ? 4 : 0;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw rotating particles around center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach(particle => {
        particle.angle += particle.speed;
        
        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${particle.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 242, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (counter < 100) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    // Counter animation
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Animate circle progress
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 140;
      const offset = circumference - (counter / 100) * circumference;
      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(counterRef.current, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out"
      })
      .to(counterRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.inOut"
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.3");
    }
  }, [counter, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black"
      style={{ zIndex: 99999 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      
      <div ref={counterRef} className="relative z-10 flex flex-col items-center">
        {/* Outer ring decoration */}
        <svg className="absolute" width="400" height="400" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circles */}
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="rgba(0, 242, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="rgba(0, 242, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="rgba(0, 242, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="200"
            cy="200"
            r="140"
            stroke="url(#cyanGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 140}
            strokeDashoffset={2 * Math.PI * 140}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0, 242, 255, 0.8))'
            }}
          />
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2ff" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00f2ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Counter with glitch effect */}
        <div className="relative">
          <div className="text-8xl md:text-9xl font-display font-bold text-white tracking-tight">
            {counter}
          </div>
          
          {/* Cyan glow layers */}
          <div 
            className="absolute inset-0 text-8xl md:text-9xl font-display font-bold text-cyan-400 opacity-30 blur-md"
          >
            {counter}
          </div>
          <div 
            className="absolute inset-0 text-8xl md:text-9xl font-display font-bold text-cyan-400 opacity-20 blur-lg"
          >
            {counter}
          </div>
        </div>

        {/* Percentage symbol */}
        <div className="text-3xl md:text-4xl font-display text-cyan-400/70 -mt-4">
          PERCENT
        </div>

        {/* Loading text */}
        <div className="mt-12 text-sm tracking-[0.4em] text-cyan-400/60 uppercase animate-pulse">
          SYNCHRONIZE 4.0
        </div>

        {/* Animated line */}
        <div className="mt-6 w-32 h-px bg-cyan-400/20 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.8)]"
            style={{
              animation: 'scan 2s ease-in-out infinite',
              width: '30%'
            }}
          />
        </div>

        {/* Hexagon decorations */}
        <div className="absolute top-[-80px] left-[-80px] w-16 h-16 opacity-30">
          <svg viewBox="0 0 100 100" className="animate-spin-slow">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#00f2ff" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute bottom-[-80px] right-[-80px] w-20 h-20 opacity-20">
          <svg viewBox="0 0 100 100" className="animate-spin-reverse">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#00f2ff" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Corner accents with cyan */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-400/40 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-400/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-400/40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-400/40 animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-400 to-transparent h-1 animate-scan" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(300%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes scan-vertical {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-scan {
          animation: scan-vertical 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
