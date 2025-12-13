import { useEffect, useRef, useState, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagicCircle = forwardRef(({ className, style }, ref) => (
  <svg ref={ref} viewBox="0 0 200 200" className={className} style={style}>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g stroke="currentColor" strokeWidth="2" fill="none" filter="url(#glow)">
      {/* Outer Rings */}
      <circle cx="100" cy="100" r="95" strokeDasharray="10 5" />
      <circle cx="100" cy="100" r="85" />
      <path d="M100 15 A85 85 0 0 1 185 100" strokeDasharray="4 4" />
      
      {/* Inner Square/Diamonds */}
      <rect x="55" y="55" width="90" height="90" transform="rotate(45 100 100)" strokeOpacity="0.8" />
      <rect x="55" y="55" width="90" height="90" transform="rotate(22.5 100 100)" strokeOpacity="0.6" />
      
      {/* Runes (simplified lines) */}
      <path d="M100 25 L100 175 M25 100 L175 100" strokeOpacity="0.5" />
      <path d="M45 45 L155 155 M155 45 L45 155" strokeOpacity="0.5" />
      
      {/* Inner Circles */}
      <circle cx="100" cy="100" r="40" strokeWidth="3" />
      <circle cx="100" cy="100" r="30" strokeDasharray="2 3" />
    </g>
  </svg>
));

const scheduleData = {
  day1: [
    { time: "09:00 AM", title: "The Awakening", description: "Inauguration and Keynote Speech" },
    { time: "10:30 AM", title: "Multiverse Hack", description: "24-hour coding marathon starts" },
    { time: "01:00 PM", title: "Sanctum Feast", description: "Networking and Refreshments" },
    { time: "02:30 PM", title: "Ancient Wisdom", description: "Guest lecture by Industry Expert" },
    { time: "05:00 PM", title: "Astral Gaming", description: "Valorant and FIFA showdown" },
    { time: "07:00 PM", title: "Sorcerer's Sup", description: "Meet sponsors and mentors" },
  ],
  day2: [
    { time: "08:00 AM", title: "Morning Mana", description: "Morning refreshments" },
    { time: "09:30 AM", title: "Mystic Arts: AI/ML", description: "Hands-on machine learning workshop" },
    { time: "12:00 PM", title: "Construct Wars", description: "Robot combat competition begins" },
    { time: "02:00 PM", title: "Dimension Break", description: "Food and relaxation" },
    { time: "03:30 PM", title: "Mirror Dimension", description: "UI/UX design competition" },
    { time: "06:00 PM", title: "Kamar-Taj Night", description: "Music, dance, and entertainment" },
  ],
  day3: [
    { time: "09:00 AM", title: "Final Reckoning", description: "Hackathon project demos" },
    { time: "11:00 AM", title: "Construct Finals", description: "Championship battle" },
    { time: "01:00 PM", title: "Last Meal", description: "Last meal together" },
    { time: "02:30 PM", title: "Time Stone Awards", description: "Awards and recognition ceremony" },
    { time: "04:00 PM", title: "Portal Close", description: "Thank you and farewell" },
  ],
};

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const runeRef = useRef(null);
  const magicCirclesRef = useRef([]);
  const [activeDay, setActiveDay] = useState('day1');

  useEffect(() => {
    // Fade in the entire section
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Rotate the background Rune (Main Center)
    gsap.to(runeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

    // Animate Magic Circles on Scroll
    magicCirclesRef.current.forEach((circle, i) => {
        if (!circle) return; // Basic safety check
        
        // Initial set
        gsap.set(circle, { 
            rotation: i * 45 // Offset start rotation
        });

        gsap.to(circle, {
            rotation: i % 2 === 0 ? 360 : -360, // Alternate rotation direction
            scale: 1.5, // Pulse larger
            y: i % 2 === 0 ? 150 : -150, // Parallax movement
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // Smooth scrubbing
            }
        });
    });

    // Draw the line (Time Stream)
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: "#timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );
  }, []);

  const handleDayChange = (day) => {
    if (day === activeDay) return;

    // Animate out current timeline
    gsap.to(timelineContainerRef.current.children, {
      opacity: 0,
      x: activeDay < day ? -50 : 50,
      filter: "blur(10px)",
      stagger: 0.03,
      duration: 0.3,
      onComplete: () => {
        setActiveDay(day);
        // Animate in new timeline
        gsap.fromTo(timelineContainerRef.current.children,
          { opacity: 0, x: activeDay < day ? 50 : -50, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.4, ease: "power2.out" }
        );
      }
    });

    // Reset and redraw the line with a "Time Reversal" effect
    gsap.to(lineRef.current, {
      height: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to(lineRef.current, {
          height: '100%',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  };

  const currentSchedule = scheduleData[activeDay];

  return (
    <section id="schedule" ref={sectionRef} className="py-24 sm:py-32 relative min-h-screen z-10 overflow-hidden bg-black">
      
      {/* Background Magic Runes (Decorative Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none z-0">
         <div ref={runeRef} className="w-full h-full border-[2px] border-emerald-500 rounded-full flex items-center justify-center p-20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="w-full h-full border border-green-400/50 rounded-full flex items-center justify-center p-10 rotate-45">
                <div className="w-full h-full border-2 border-emerald-600/30 rounded-full flex items-center justify-center">
                    <div className="w-2/3 h-2/3 border border-green-500/20 rotate-[-45deg]"></div>
                </div>
            </div>
         </div>
      </div>

      {/* Floating Magic Circles (Scroll Activated) */}
      <div className="absolute top-20 -left-20 w-64 h-64 z-0 opacity-30 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-emerald-500 w-full h-full" style={{}} ref={el => magicCirclesRef.current[0] = el} />
      </div>
      <div className="absolute bottom-40 -right-32 w-96 h-96 z-0 opacity-30 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-green-400 w-full h-full" style={{}} ref={el => magicCirclesRef.current[1] = el} />
      </div>
       <div className="absolute top-1/3 right-10 w-32 h-32 z-0 opacity-20 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-teal-400 w-full h-full" style={{}} ref={el => magicCirclesRef.current[2] = el} />
      </div>


      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 relative">
             <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-linear-to-b from-green-400 to-emerald-700 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-4" style={{ WebkitTextStroke: '2px #064E3B' }}>
               SCHEDULE
             </h2>
             <div className="inline-block bg-emerald-900/30 border-2 border-green-500/50 px-4 py-1 rounded-sm rotate-[-2deg] mb-4">
                 <p className="text-green-400 font-mono tracking-[0.2em] text-sm sm:text-base uppercase font-bold pop-art-text">
                    DORMAMMU! I'VE COME TO BARGAIN
                 </p>
             </div>
        </div>

        {/* Day Selector - Agamotto Style */}
        <div className="flex justify-center gap-6 mb-20 flex-wrap px-4">
          {['day1', 'day2', 'day3'].map((day, idx) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`cursor-pointer group relative px-8 py-3 font-display font-bold text-lg tracking-wider transition-all duration-300 clip-path-slant border-2 ${
                activeDay === day
                  ? 'bg-emerald-900 border-green-400 text-green-300 shadow-[6px_6px_0px_#10B981] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-black border-emerald-900 text-emerald-700 hover:border-green-500/50 hover:text-green-400'
              }`}
            >
              <span className="relative z-10">
                Day 0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        <div id="timeline-container" ref={timelineContainerRef} className="relative max-w-4xl mx-auto">
          {/* Central Line - The Time Stream */}
          <div className="absolute left-[15px] sm:left-[19px] md:left-1/2 top-0 bottom-0 w-1 bg-emerald-900/30 -translate-x-1/2"></div>
          <div ref={lineRef} className="absolute left-[15px] sm:left-[19px] md:left-1/2 top-0 w-1 bg-linear-to-b from-green-400 via-emerald-500 to-green-600 -translate-x-1/2 origin-top shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>

          {currentSchedule.map((item, index) => (
            <div key={`${activeDay}-${index}`} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Eye of Agamotto Node */}
              <div className="absolute left-[15px] sm:left-[19px] md:left-1/2 -translate-x-1/2 z-20 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black border-2 border-green-400 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-900/50 animate-pulse"></div>
                      <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#4ade80] relative z-10"></div>
                  </div>
              </div>
              
              {/* Content Card with Halftone and Comic Styles */}
              <div className="ml-12 sm:ml-16 md:ml-0 md:w-1/2 md:px-12">
                <div className={`relative bg-black border-2 border-emerald-900 p-6 sm:p-8 hover:border-green-400 hover:shadow-[8px_8px_0px_#10B981] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  
                  {/* Halftone Pattern Overlay */}
                  <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none z-0"></div>

                  {/* Decorative Corner Lines */}
                  <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

                  <span className="relative z-10 text-emerald-500 font-mono font-bold text-sm tracking-widest block mb-2 bg-black/50 inline-block px-1">{item.time}</span>
                  <h3 className="relative z-10 text-2xl font-display font-black text-white mb-2 uppercase tracking-wide group-hover:text-green-300 transition-colors drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{item.title}</h3>
                  <p className="relative z-10 text-gray-400 font-sans text-sm leading-relaxed border-l-2 border-emerald-900/50 pl-3 group-hover:border-green-500/50 transition-colors">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
