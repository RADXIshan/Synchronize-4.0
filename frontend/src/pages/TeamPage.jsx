import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../utils/teamData'; 
import TeamMemberCard from '../components/TeamMemberCard';
import bgAvengersMain from '../assets/comic_theme/bg_avengers_main.png';

gsap.registerPlugin(ScrollTrigger);

const TeamPage = () => {
  const [activeBg, setActiveBg] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax or enter animations for cards
    gsap.fromTo('.team-card', 
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  // Determine the background to render
  const currentBgPath = activeBg || bgAvengersMain;

  return (
    <div id="team" className="min-h-screen bg-[#111] pt-24 pb-20 relative overflow-hidden transition-all duration-700">
      
      {/* Dynamic Character Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* Avengers-like base background image */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeBg ? 'opacity-100' : 'opacity-50'}`}>
          <img 
            key={currentBgPath} // Force re-render/animation on image change if needed, though opacity handles it. Actually, better without key so src swaps seamlessly
            src={currentBgPath} 
            alt="Dynamic Hero Background" 
            className="w-full h-full object-cover object-top md:object-[center_10%]"
          />
        </div>

        {/* Comic Effects Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>
        <div className="absolute inset-0 halftone-pattern opacity-[0.05]"></div>

        {/* Tint Overlay removed to keep original colors */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black mix-blend-overlay opacity-50"></div>
      </div>

      <div ref={containerRef} className="relative container mx-auto px-4 z-10">
        
        <div className="text-center mb-16 pt-10 relative">
           {/* "Stan Lee" Style Intro Box */}
           <div className="inline-block bg-white border-4 border-black p-2 mb-4 sm:mb-6 transform -rotate-2 shadow-[4px_4px_0px_#000]">
             <span className="text-black font-black uppercase tracking-widest text-xs sm:text-sm md:text-base">
               Initiative
             </span>
           </div>

           <div className="relative inline-block px-4">
             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white mb-2 tracking-tighter relative z-10 italic leading-none"
               style={{
                 WebkitTextStroke: '2px black',
                 textShadow: '5px 5px 0px #D2161E'
               }}>
               THE HEROES
             </h1>
           </div>
           
           <div className="max-w-[90%] sm:max-w-2xl mx-auto mt-6 bg-yellow-400 border-2 sm:border-4 border-black p-4 shadow-[8px_8px_0px_#000] transform rotate-1">
             <p className="text-black text-sm sm:text-lg font-bold font-comic uppercase tracking-tight leading-tight">
               The minds behind the madness. Synchronize 4.0 is brought to you by this league of extraordinary developers.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12 pb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card h-full">
              <TeamMemberCard member={member} index={index} setActiveBg={setActiveBg} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center relative mb-20 z-20">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-black -z-10 transform -translate-y-1/2 shadow-[0px_4px_0px_#D2161E]"></div>
          <div className="inline-block px-12 py-6 bg-blue-600 border-4 border-black shadow-[10px_10px_0px_#000] transform rotate-2 hover:scale-110 hover:-rotate-2 transition-transform cursor-pointer">
            <span className="text-2xl font-black uppercase italic tracking-wider text-white" style={{ textShadow: '2px 2px 0px #000' }}>
              MORE HEROES INCOMING...
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamPage;
