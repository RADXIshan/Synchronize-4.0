import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedNumber = ({ finalValue, label, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const numberRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = numberRef.current;
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          animateNumber();
        }
      }
    });

    const animateNumber = () => {
      // Extract numeric value and suffix
      const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
      const suffix = finalValue.replace(/[0-9]/g, '');
      
      let iteration = 0;
      const totalIterations = 30;
      const slowDownPoint = 20;
      
      const interval = setInterval(() => {
        if (iteration < slowDownPoint) {
          // Fast random numbers
          const randomNum = Math.floor(Math.random() * numericValue * 2);
          setDisplayValue(randomNum + suffix);
          iteration++;
        } else if (iteration < totalIterations) {
          // Slow down and converge to final value
          const progress = (iteration - slowDownPoint) / (totalIterations - slowDownPoint);
          const currentNum = Math.floor(numericValue * progress + Math.random() * (numericValue * (1 - progress)));
          setDisplayValue(currentNum + suffix);
          iteration++;
        } else {
          // Final value
          setDisplayValue(finalValue);
          clearInterval(interval);
        }
      }, iteration < slowDownPoint ? 50 : 100);
    };

    return () => {
      scrollTrigger.kill();
    };
  }, [finalValue]);

  return (
    <div ref={numberRef} className="relative">
      <div className="glass-card p-8 rounded-2xl relative overflow-hidden border border-white/10">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Animated gradient line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 mb-3 font-display">
          {displayValue}
        </h3>
        <p className="text-gray-300 uppercase tracking-widest text-sm font-semibold">
          {label}
        </p>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-purple-400 to-transparent"></div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate description card
    gsap.fromTo(descriptionRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-32 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Title */}
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400">The Fest</span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Description Card */}
          <div ref={descriptionRef} className="glass-card p-10 md:p-14 rounded-3xl text-center relative overflow-hidden mb-16 border border-white/10 shadow-[0_0_80px_rgba(0,242,255,0.15)]">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 font-light">
                Synchronize 4.0 is not just a tech fest; it's a <span className="text-cyan-400 font-semibold">convergence of ideas</span>, innovation, and futuristic vision. 
                We bring together the brightest minds to compete, collaborate, and create.
              </p>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                From <span className="text-purple-400 font-semibold">coding marathons</span> to <span className="text-pink-400 font-semibold">robotics showdowns</span>, immerse yourself in an ecosystem where technology meets creativity. 
                Join us as we redefine the boundaries of what's possible.
              </p>
            </div>
            
            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedNumber finalValue="20+" label="Events" delay={0} />
            <AnimatedNumber finalValue="1000+" label="Participants" delay={0.2} />
            <AnimatedNumber finalValue="₹50k+" label="Prizes" delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
