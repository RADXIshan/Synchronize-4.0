import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import gsap from 'gsap';

const COMIC_PHRASES = [
  "ASSEMBLE!",
  "ZOOM!",
  "WHAM!",
  "LOADING...",
  "SYNCHRONIZING...",
  "EXCELSIOR!"
];

const BG_COLORS = [
  "bg-red-600", // Marvel Red
  "bg-blue-600", // Cap Blue
  "bg-yellow-500", // Iron Gold
  "bg-purple-600", // Panther Purple
  "bg-green-600"  // Hulk Green
];

export default function PageTransition({ children }) {
  const location = useLocation();
  const [transitionText, setTransitionText] = useState(COMIC_PHRASES[0]);
  const [bgColor, setBgColor] = useState(BG_COLORS[0]);
  
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // Cleanup previous timeline if it exists preventing stuck states
    if (tlRef.current) tlRef.current.kill();

    // Randomize for fun
    setTransitionText(COMIC_PHRASES[Math.floor(Math.random() * COMIC_PHRASES.length)]);
    setBgColor(BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]);

    const tl = gsap.timeline();
    tlRef.current = tl;

    const overlay = overlayRef.current;
    const text = textRef.current;
    
    // Force reset state immediately
    gsap.set(overlay, { xPercent: -100, skewX: 0, opacity: 1, display: 'flex' });
    gsap.set(text, { scale: 0, opacity: 0, rotation: -15 });

    // 1. Wipe In
    tl.to(overlay, {
      xPercent: 0,
      skewX: -10,
      duration: 0.4,
      ease: "power4.inOut",
    })
    .to(overlay, {
      skewX: 0,
      duration: 0.2,
      ease: "power2.out"
    }, "-=0.1")
    
    // 2. Text Pop
    .to(text, {
      scale: 1.2,
      opacity: 1,
      rotation: 0,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    
    // 3. Pause briefly
    .to({}, { duration: 0.2 })
    
    // 4. Wipe Out (to the right)
    .to(text, {
      scale: 0,
      opacity: 0,
      duration: 0.2
    })
    .to(overlay, {
      xPercent: 100,
      skewX: 10,
      duration: 0.4,
      ease: "power4.inOut"
    }, "-=0.1")
    // Ensure it's gone visually
    .set(overlay, { display: 'none' });

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* Visual Overlay */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden ${bgColor} border-r-8 border-l-8 border-black`}
        style={{ 
          transform: 'translateX(-100%)', 
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* Decorative Halftone Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(black 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }} 
        />
        
        {/* Speed Lines */}
        <div className="absolute inset-0 opacity-10 speed-lines w-full h-full" />

        {/* Transition Text */}
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)] -rotate-6"
          style={{ textShadow: '4px 4px 0 #000', WebkitTextStroke: '2px black' }}
        >
          {transitionText}
        </h1>
      </div>
      
      {/* Actual Page Content */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
