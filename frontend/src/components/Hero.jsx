import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

const Hero = ({ startAnimation }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();

    // Elegant Text Reveal
    tl.fromTo(textRef.current.children, 
      { y: 100, opacity: 0, filter: 'blur(20px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 1.8, ease: 'power4.out' }
    )
    .fromTo(subTextRef.current, 
      { opacity: 0, y: 30, filter: 'blur(10px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, 
      '-=1.2'
    );
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-transparent">
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4">
        <div ref={textRef} className="text-center mb-8 mix-blend-screen flex flex-col md:block py-4"> {/* Added py-4 to prevent cutoff */}
          <h1 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter text-white inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            SYNCHRONIZE
          </h1>
          <h1 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-600 inline-block md:ml-6 filter drop-shadow-[0_0_20px_rgba(0,242,255,0.5)] pb-2 pr-2"> {/* Added padding to fix cutoff */}
            4.0
          </h1>
        </div>
        
        <p ref={subTextRef} className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light tracking-[0.2em] text-center uppercase drop-shadow-lg font-sans">
          Beyond the Horizon
        </p>

        <div className="mt-16 flex flex-col md:flex-row gap-8 pointer-events-auto">
          <MagneticButton className="cursor-pointer px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            REGISTER NOW
          </MagneticButton>
          <MagneticButton className="cursor-pointer px-10 py-4 border border-white text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
            EXPLORE EVENTS
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20 pointer-events-none">
        <span className="text-xs tracking-[0.3em] uppercase font-sans">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
